package dev.eventpulse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Component
public class KafkaPublisher {
    private final KafkaTemplate<String,String> kafka;
    private final long timeoutMs;
    public KafkaPublisher(KafkaTemplate<String,String> kafka,
            @Value("${eventpulse.relay.ack-timeout-ms}") long timeoutMs) {
        if (timeoutMs < 1) throw new IllegalArgumentException("relay acknowledgment timeout must be positive");
        this.kafka = kafka;
        this.timeoutMs = timeoutMs;
    }
    public void publish(OutboxMessage message) throws InterruptedException, ExecutionException, TimeoutException {
        kafka.send(message.topic(), message.key(), message.payload()).get(timeoutMs, TimeUnit.MILLISECONDS);
    }
}
