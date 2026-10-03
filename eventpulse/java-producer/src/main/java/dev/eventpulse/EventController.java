package dev.eventpulse;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/v1/events")
public class EventController {
    private final EventValidator validator;
    private final IngressService service;
    private final JdbcTemplate jdbc;
    public EventController(EventValidator validator, IngressService service, JdbcTemplate jdbc) {
        this.validator = validator;
        this.service = service;
        this.jdbc = jdbc;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> accept(@Valid @RequestBody JsonNode input) {
        var payload = validator.validateAndNormalize(input);
        boolean duplicate = service.accept(payload);
        return ResponseEntity.status(duplicate ? HttpStatus.OK : HttpStatus.ACCEPTED)
                .body(Map.of("event_id", payload.get("event_id").textValue(),
                        "duplicate", duplicate, "status", "durably_queued"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> status(@PathVariable UUID id) {
        var rows = jdbc.queryForList("""
                SELECT i.event_id::text AS event_id,
                       (o.published_at IS NOT NULL) AS published,
                       EXISTS(SELECT 1 FROM consumer_inbox c WHERE c.event_id=i.event_id) AS processed
                FROM ingress_events i LEFT JOIN outbox o ON o.outbox_id='ingress:'||i.event_id::text
                WHERE i.event_id=?
                """, id);
        return rows.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(rows.get(0));
    }
}
