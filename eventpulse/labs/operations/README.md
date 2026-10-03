# Operations and three-process Kafka failover reference

Supplied study reference. Rebuild independently later; the reference passing does not assess the learner.

The standalone Compose project is **eventpulse-ha-lab**. It does not reuse the main app's Kafka/data volumes. Apache Kafka **4.1.1**, three combined broker/controller processes, static KRaft quorum 1/2/3, RF=3 and minimum ISR=2. Each broker heap is 128–256 MiB and container memory cap is 768 MiB. The one-shot root volume initializer only changes ownership of its own named log volume; broker processes retain the image's non-root user.

All nodes share one Docker host. This tests process loss, controller-majority behavior and replica recovery; it does not establish host, zone or region fault tolerance. Combined-role nodes are a small learning topology. Loopback ports 29092,29093,29094 use plaintext and are not a production security design.

## Run and preserve evidence

From the workspace root, use an environment that has confluent-kafka installed (the main reference worker environment can supply it):

~~~sh
docker compose -p eventpulse-ha-lab -f eventpulse/docker-compose.ha.yml up -d --wait
python eventpulse/labs/operations/ha_probe.py prepare
python eventpulse/labs/operations/ha_probe.py send --run-id baseline
python eventpulse/labs/operations/ha_probe.py verify
python eventpulse/labs/operations/ha_probe.py snapshot
~~~

The probe only accepts loopback HA-lab ports and ha- prefixed topics. It creates one partition with RF3/minISR2. Keep the baseline acknowledgement ledger; verify checks logical IDs against a retained-log snapshot instead of trusting a count of raw messages.

A timed-out produce has an ambiguous outcome, and its ID remains in the ledger. Producer idempotence applies within its protocol scope; consumer-side ID counting is a verification observation, not a proof of database deduplication.

## Leader-process failure experiment

1. Read partition 0 leader from snapshot. Map broker ID N to service kafka-N.
2. Stop that service using this explicit project and file, replacing kafka-1 with the observed leader:

~~~sh
docker compose -p eventpulse-ha-lab -f eventpulse/docker-compose.ha.yml stop kafka-1
python eventpulse/labs/operations/ha_probe.py snapshot
python eventpulse/labs/operations/ha_probe.py send --run-id one-node-down --ledger eventpulse/labs/operations/artifacts/one-node-down.json
python eventpulse/labs/operations/ha_probe.py verify --ledger eventpulse/labs/operations/artifacts/one-node-down.json
python eventpulse/labs/operations/ha_probe.py verify
~~~

3. Save snapshots showing the changed leader and remaining ISR. One process failure leaves two controllers (majority) and two in-sync broker replicas if they were caught up; acknowledgements should remain possible after election.
4. If election/recovery takes time, observe the actual state and retry the probe with the same logical run IDs. Do not silently count timeout as proven loss.

## Two-process failure experiment

Stop a second distinct service. Wait for metadata to show ISR below two or for the majority-loss condition to settle. Run:

~~~sh
python eventpulse/labs/operations/ha_probe.py send --run-id two-nodes-down --expect-blocked --ledger eventpulse/labs/operations/artifacts/two-nodes-down.json
~~~

Expected: no successful acks=all acknowledgements once minimum ISR cannot be met. The command does not prove every failed message was never appended; it records unknown-or-failed outcomes. Controller quorum is also lost with only one of three combined processes alive. Do not use this setup to isolate broker quorum and controller quorum independently; that needs separately deployed roles.

Restore only these lab services:

~~~sh
docker compose -p eventpulse-ha-lab -f eventpulse/docker-compose.ha.yml start kafka-1 kafka-2 kafka-3
docker compose -p eventpulse-ha-lab -f eventpulse/docker-compose.ha.yml up -d --wait
python eventpulse/labs/operations/ha_probe.py snapshot
python eventpulse/labs/operations/ha_probe.py verify
~~~

Retained acknowledgements should still reconcile after recovery under the lab's persistence assumptions. Lost volumes, simultaneous host loss and retention expiry are different fault models.

## Teardown and limits

~~~sh
docker compose -p eventpulse-ha-lab -f eventpulse/docker-compose.ha.yml down
~~~

This preserves volumes for recovery. Use down -v only when intentionally discarding this lab's log evidence; do not use a global Docker prune.

A green broker health check verifies an admin path, not the application database effects. HA probe evidence is separate from the root app's transactional outbox/inbox integration evidence.

References: [KRaft](https://kafka.apache.org/41/operations/kraft/), [Kafka delivery semantics](https://kafka.apache.org/41/design/design/#message-delivery-semantics), [producer configuration](https://kafka.apache.org/41/configuration/producer-configs/).

