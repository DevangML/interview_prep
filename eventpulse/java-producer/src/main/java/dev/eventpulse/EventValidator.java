package dev.eventpulse;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.validation.Validator;
import org.springframework.stereotype.Component;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DateTimeParseException;
import java.util.regex.Pattern;
import java.util.Set;
import java.util.UUID;

@Component
public class EventValidator {
    private static final Pattern IDENTIFIER = Pattern.compile("[A-Za-z0-9_.:-]{1,64}");
    private static final Pattern TIMESTAMP = Pattern.compile("\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d{1,6})?(?:Z|[+-]\\d{2}:\\d{2})");
    private static final Set<String> FIELDS = Set.of("schema_version", "event_id",
            "warehouse_id", "device_id", "metric", "value", "occurred_at");
    private final Validator validator;
    private final ObjectMapper mapper;

    public EventValidator(Validator validator, ObjectMapper mapper) {
        this.validator = validator;
        this.mapper = mapper;
    }

    public ObjectNode validateAndNormalize(JsonNode input) {
        if (input == null || !input.isObject() || input.size() != FIELDS.size())
            throw invalid("exactly the seven event fields are required");
        input.fieldNames().forEachRemaining(name -> {
            if (!FIELDS.contains(name)) throw invalid("unknown event field");
        });
        if (!input.path("schema_version").isIntegralNumber()
                || !input.path("schema_version").canConvertToInt()
                || input.path("schema_version").intValue() != 1)
            throw invalid("schema_version must be integer 1");
        String eventId = text(input, "event_id");
        String warehouse = boundedText(input, "warehouse_id");
        String device = boundedText(input, "device_id");
        String metric = boundedText(input, "metric");
        String occurred = text(input, "occurred_at");
        if (!input.path("value").isNumber())
            throw invalid("value must be a finite JSON number");
        double value = input.path("value").doubleValue();
        if (!Double.isFinite(value)) throw invalid("value must be finite");
        UUID id;
        try {
            id = UUID.fromString(eventId);
            if (!id.toString().equalsIgnoreCase(eventId)) throw invalid("event_id must be canonical UUID");
        } catch (IllegalArgumentException ex) {
            throw invalid("event_id must be canonical UUID");
        }
        String instant;
        try {
            if (!TIMESTAMP.matcher(occurred).matches()) throw invalid("occurred_at has invalid timestamp syntax");
            var parsed = OffsetDateTime.parse(occurred);
            int localYear = parsed.getYear();
            int utcYear = parsed.withOffsetSameInstant(ZoneOffset.UTC).getYear();
            if (localYear < 1 || utcYear < 1 || utcYear > 9999)
                throw invalid("occurred_at must fit years 0001 through 9999 in UTC");
            instant = new DateTimeFormatterBuilder().appendInstant(6).toFormatter()
                    .format(parsed.toInstant());
        } catch (DateTimeParseException ex) {
            throw invalid("occurred_at must be ISO-8601 with an offset");
        }
        EventRequest request = new EventRequest(1, id.toString(), warehouse, device, metric, value, instant);
        if (!validator.validate(request).isEmpty())
            throw invalid("event fields must be nonblank and present");
        ObjectNode result = mapper.createObjectNode();
        result.put("schema_version", 1);
        result.put("event_id", id.toString());
        result.put("warehouse_id", warehouse);
        result.put("device_id", device);
        result.put("metric", metric);
        result.put("value", value);
        result.put("occurred_at", instant);
        return result;
    }

    private String text(JsonNode node, String field) {
        if (!node.path(field).isTextual()) throw invalid(field + " must be a string");
        return node.path(field).textValue();
    }

    private String boundedText(JsonNode node, String field) {
        String value = text(node, field);
        if (!IDENTIFIER.matcher(value).matches())
            throw invalid(field + " must match [A-Za-z0-9_.:-]{1,64}");
        return value;
    }

    private InvalidEventException invalid(String message) {
        return new InvalidEventException(message);
    }
}
