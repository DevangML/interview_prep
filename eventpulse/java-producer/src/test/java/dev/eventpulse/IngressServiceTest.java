package dev.eventpulse;

import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.DataAccessResourceFailureException;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class IngressServiceTest {
    @Test void newEventEnqueuesSamePayloadWithStableId() {
        var jdbc = mock(JdbcTemplate.class);
        var payload = EventValidatorTest.event();
        UUID id = UUID.fromString(payload.get("event_id").textValue());
        when(jdbc.update(contains("INSERT INTO ingress_events"), eq(id), eq(payload.toString()))).thenReturn(1);
        assertFalse(new IngressService(jdbc).accept(payload));
        verify(jdbc).update(contains("INSERT INTO outbox"), eq("ingress:"+id),
                eq("pune-1:scanner-1:latency_ms"), eq(payload.toString()));
    }

    @Test void duplicateChecksDatabaseJsonbEqualityWithoutAnotherOutbox() {
        var jdbc = mock(JdbcTemplate.class);
        var payload = EventValidatorTest.event();
        UUID id = UUID.fromString(payload.get("event_id").textValue());
        when(jdbc.queryForObject(contains("SELECT payload ="), eq(Boolean.class), eq(payload.toString()), eq(id)))
                .thenReturn(true);
        assertTrue(new IngressService(jdbc).accept(payload));
        verify(jdbc, never()).update(contains("INSERT INTO outbox"), any(), any(), any());
    }

    @Test void conflictAndOutboxFailureCannotReturnSuccess() {
        var jdbc = mock(JdbcTemplate.class);
        assertThrows(EventConflictException.class, () -> new IngressService(jdbc).accept(EventValidatorTest.event()));
        var broken = mock(JdbcTemplate.class);
        when(broken.update(contains("INSERT INTO ingress_events"), any(UUID.class), anyString())).thenReturn(1);
        when(broken.update(contains("INSERT INTO outbox"), anyString(), anyString(), anyString()))
                .thenThrow(new DataAccessResourceFailureException("outbox failed"));
        assertThrows(DataAccessResourceFailureException.class,
                () -> new IngressService(broken).accept(EventValidatorTest.event()));
        // Actual rollback requires root's real PostgreSQL integration test through Spring's proxy.
    }
}
