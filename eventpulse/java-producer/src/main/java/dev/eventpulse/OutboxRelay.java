package dev.eventpulse;

import org.apache.kafka.common.KafkaException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

@Service
public class OutboxRelay {
    private final JdbcTemplate jdbc;
    private final KafkaPublisher publisher;
    private final int batchSize;
    public OutboxRelay(JdbcTemplate jdbc, KafkaPublisher publisher,
            @Value("${eventpulse.relay.batch-size}") int batchSize) {
        if (batchSize < 1 || batchSize > 100) throw new IllegalArgumentException("relay batch size must be 1..100");
        this.jdbc = jdbc;
        this.publisher = publisher;
        this.batchSize = batchSize;
    }

    @Transactional
    public int relayBatch() {
        var rows = jdbc.query("""
                SELECT outbox_id,topic,message_key,payload::text
                FROM outbox WHERE published_at IS NULL
                ORDER BY created_at,outbox_id LIMIT ? FOR UPDATE SKIP LOCKED
                """, (rs, row) -> new OutboxMessage(rs.getString(1),rs.getString(2),rs.getString(3),rs.getString(4)), batchSize);
        int published = 0;
        for (var row : rows) {
            String failure = null;
            try {
                publisher.publish(row);
            } catch (InterruptedException ex) {
                Thread.currentThread().interrupt();
                failure = "interrupted";
            } catch (ExecutionException | TimeoutException | KafkaException | org.springframework.kafka.KafkaException ex) {
                // Keep diagnostic class only: client messages may contain credentials.
                failure = ex.getClass().getSimpleName();
            }
            // SQL exceptions escape: a failed PostgreSQL transaction must not continue as success.
            if (failure == null) {
                jdbc.update("""
                        UPDATE outbox SET published_at=clock_timestamp(),attempts=attempts+1,last_error=NULL
                        WHERE outbox_id=?
                        """, row.id());
                published++;
            } else {
                jdbc.update("UPDATE outbox SET attempts=attempts+1,last_error=? WHERE outbox_id=?", failure, row.id());
                // One failed destination may be unavailable for the whole batch; release locks promptly.
                break;
            }
        }
        return published;
    }
}
