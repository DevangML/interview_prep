package dev.eventpulse;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
public class IngressService {
    private final JdbcTemplate jdbc;
    public IngressService(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @Transactional
    public boolean accept(ObjectNode payload) {
        UUID eventId = UUID.fromString(payload.get("event_id").textValue());
        String json = payload.toString();
        int inserted = jdbc.update("""
                INSERT INTO ingress_events(event_id,payload)
                VALUES (?,CAST(? AS jsonb)) ON CONFLICT(event_id) DO NOTHING
                """, eventId, json);
        if (inserted == 0) {
            Boolean same = jdbc.queryForObject("""
                    SELECT payload = CAST(? AS jsonb) FROM ingress_events WHERE event_id = ?
                    """, Boolean.class, json, eventId);
            if (!Boolean.TRUE.equals(same)) throw new EventConflictException();
            return true;
        }
        String key = payload.get("warehouse_id").textValue() + ":"
                + payload.get("device_id").textValue() + ":" + payload.get("metric").textValue();
        jdbc.update("""
                INSERT INTO outbox(outbox_id,topic,message_key,payload)
                VALUES (?,'telemetry-raw',?,CAST(? AS jsonb))
                """, "ingress:" + eventId, key, json);
        return false;
    }
}
