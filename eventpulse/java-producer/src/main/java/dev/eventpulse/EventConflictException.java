package dev.eventpulse;

public class EventConflictException extends RuntimeException {
    public EventConflictException() { super("event_id already identifies a different payload"); }
}
