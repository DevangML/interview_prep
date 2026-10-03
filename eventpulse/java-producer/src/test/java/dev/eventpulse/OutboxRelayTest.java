package dev.eventpulse;

import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.dao.DataAccessResourceFailureException;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class OutboxRelayTest {
    private final OutboxMessage row = new OutboxMessage("ingress:1", "telemetry-raw", "p:d:m", "{}");
    @SuppressWarnings("unchecked")
    private JdbcTemplate database() {
        var jdbc = mock(JdbcTemplate.class);
        when(jdbc.query(anyString(), any(RowMapper.class), eq(10))).thenReturn(List.of(row));
        return jdbc;
    }

    @Test void onlyMarksPublishedAfterAcknowledgment() throws Exception {
        var jdbc = database();
        var publisher = mock(KafkaPublisher.class);
        assertEquals(1, new OutboxRelay(jdbc, publisher, 10).relayBatch());
        var order = inOrder(publisher, jdbc);
        order.verify(jdbc).query(anyString(), any(RowMapper.class), eq(10));
        order.verify(publisher).publish(row);
        order.verify(jdbc).update(contains("published_at=clock_timestamp()"), eq(row.id()));
    }

    @Test void brokerFailureLeavesRowPendingAndRecordsSafeError() throws Exception {
        var jdbc = database();
        var publisher = mock(KafkaPublisher.class);
        doThrow(new ExecutionException(new RuntimeException("sensitive broker detail"))).when(publisher).publish(row);
        assertEquals(0, new OutboxRelay(jdbc, publisher, 10).relayBatch());
        verify(jdbc).update(contains("last_error=?"), eq("ExecutionException"), eq(row.id()));
        verify(jdbc, never()).update(contains("published_at=clock_timestamp()"), anyString());
    }

    @Test void timeoutIsAmbiguousAndRemainsReplayable() throws Exception {
        var jdbc = database();
        var publisher = mock(KafkaPublisher.class);
        doThrow(new TimeoutException("may already have committed")).when(publisher).publish(row);
        assertEquals(0, new OutboxRelay(jdbc, publisher, 10).relayBatch());
        verify(jdbc).update(contains("last_error=?"), eq("TimeoutException"), eq(row.id()));
    }

    @Test void databaseFailureEscapesForTransactionRollback() {
        var jdbc = database();
        when(jdbc.update(contains("published_at=clock_timestamp()"), anyString()))
                .thenThrow(new DataAccessResourceFailureException("write failed"));
        assertThrows(DataAccessResourceFailureException.class,
                () -> new OutboxRelay(jdbc, mock(KafkaPublisher.class), 10).relayBatch());
    }
}
