package dev.eventpulse;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name="eventpulse.relay.enabled", havingValue="true", matchIfMissing=true)
public class RelaySchedule {
    private final OutboxRelay relay;
    public RelaySchedule(OutboxRelay relay) { this.relay = relay; }

    @Scheduled(fixedDelayString="${eventpulse.relay.delay-ms}")
    public void run() { relay.relayBatch(); }
}
