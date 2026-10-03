package dev.eventpulse;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EventRequest(
        @JsonProperty("schema_version") @NotNull Integer schemaVersion,
        @JsonProperty("event_id") @NotBlank String eventId,
        @JsonProperty("warehouse_id") @NotBlank String warehouseId,
        @JsonProperty("device_id") @NotBlank String deviceId,
        @JsonProperty("metric") @NotBlank String metric,
        @JsonProperty("value") @NotNull Double value,
        @JsonProperty("occurred_at") @NotBlank String occurredAt) {}
