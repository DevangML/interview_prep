package dev.eventpulse;

public record OutboxMessage(String id, String topic, String key, String payload) {}
