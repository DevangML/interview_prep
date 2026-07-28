---
doc_id: eng-oncall-runbook
title: Production On-Call Runbook
department: engineering
classification: internal
allowed_roles: engineer,security
---

# Production On-Call Runbook
## Rotation

On-call runs weekly, handover Monday 10:00 IST. Primary responds within 15 minutes for P1
and 60 minutes for P2. Secondary is paged if the primary does not acknowledge within the
response window.

## Severity definitions

P1 is a total outage or data-integrity risk affecting more than one enterprise tenant.
P2 is a degraded service or a single-tenant outage. P3 is a non-urgent defect with a
workaround.

## First five minutes of a P1

Acknowledge the page. Open the incident channel. Post the blast radius: which tenants,
which endpoints, since when. Do not start debugging before the blast radius is posted,
because the incident commander needs it to decide on customer communication.

## Common failure: sync queue backlog

The offline-first field app queues operations locally and replays on reconnect. A backlog
alert fires when the queue depth exceeds 5,000 operations. The usual cause is a downstream
write timeout causing retries. Check the write-path latency dashboard before scaling the
consumer, because scaling consumers against a slow write path multiplies the load.

## Rollback

Deployments are rolled back through the pipeline, not by hand. Manual database changes
during an incident require the incident commander's explicit approval in the channel.
