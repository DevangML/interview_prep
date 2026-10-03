package dev.eventpulse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.validation.Validation;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class EventValidatorTest {
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final ValidatorFactory FACTORY = Validation.buildDefaultValidatorFactory();
    private final EventValidator validator = new EventValidator(FACTORY.getValidator(), MAPPER);

    static ObjectNode event() {
        ObjectNode node = MAPPER.createObjectNode();
        node.put("schema_version", 1);
        node.put("event_id", "11111111-1111-4111-8111-111111111111");
        node.put("warehouse_id", "pune-1");
        node.put("device_id", "scanner-1");
        node.put("metric", "latency_ms");
        node.put("value", 120.0);
        node.put("occurred_at", "2026-10-03T14:30:00+05:30");
        return node;
    }

    @AfterAll static void closeFactory() { FACTORY.close(); }

    @Test void normalizesSharedGoldenTimestamp() {
        var normalized = validator.validateAndNormalize(event());
        assertEquals("2026-10-03T09:00:00.000000Z", normalized.get("occurred_at").textValue());
        var utc = event();
        utc.put("occurred_at", "2026-10-03T09:00:00.000000Z");
        assertEquals(normalized, validator.validateAndNormalize(utc));
    }

    @Test void normalizesMixedCaseUuid() {
        var node = event();
        node.put("event_id", "AAAAAAAA-AAAA-4AAA-8AAA-AAAAAAAAAAAA");
        assertEquals("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
                validator.validateAndNormalize(node).get("event_id").textValue());
    }

    @ParameterizedTest
    @ValueSource(strings={"schema_version","event_id","warehouse_id","device_id","metric","value","occurred_at"})
    void requiresEveryField(String field) {
        var node = event(); node.remove(field);
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(node));
    }

    @Test void rejectsExtraField() {
        var node = event(); node.put("admin", true);
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(node));
    }

    @Test void rejectsScalarCoercionAndBooleanNumbers() {
        var stringVersion = event(); stringVersion.put("schema_version", "1");
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(stringVersion));
        var boolVersion = event(); boolVersion.put("schema_version", true);
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(boolVersion));
        var boolValue = event(); boolValue.put("value", true);
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(boolValue));
        var stringValue = event(); stringValue.put("value", "120");
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(stringValue));
    }

    @ParameterizedTest
    @ValueSource(strings={"", " ", "with space", "scanner/one", "界"})
    void rejectsInvalidIdentifier(String name) {
        var node = event(); node.put("device_id", name);
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(node));
    }

    @Test void enforcesIdentifierLengthAndFiniteValue() {
        var node = event(); node.put("metric", "x".repeat(64));
        assertDoesNotThrow(() -> validator.validateAndNormalize(node));
        node.put("metric", "x".repeat(65));
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(node));
        var nonfinite = event(); nonfinite.put("value", Double.POSITIVE_INFINITY);
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(nonfinite));
    }

    @ParameterizedTest
    @ValueSource(strings={"2026-10-03T09:00:00", "2026-10-03T09:00:00.1234567Z",
            "2026-02-30T09:00:00Z", "2026-10-03T09:00:60Z", "2026-10-03 09:00:00Z"})
    void rejectsInvalidTimestamps(String text) {
        var node = event(); node.put("occurred_at", text);
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(node));
    }

    @Test void rejectsShortUuidThatJavaWouldOtherwiseAccept() {
        var node = event(); node.put("event_id", "1-1-1-1-1");
        assertThrows(InvalidEventException.class, () -> validator.validateAndNormalize(node));
    }
}
