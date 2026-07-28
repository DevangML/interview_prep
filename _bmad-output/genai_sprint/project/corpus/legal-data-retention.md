---
doc_id: legal-data-retention
title: Data Retention and Deletion Schedule
department: legal
classification: internal
allowed_roles: employee,engineer,finance,hr,security
---

# Data Retention and Deletion Schedule
## Principle

Personal data is retained only as long as necessary for the purpose it was collected for, or
as required by law, whichever is longer. Retention is enforced by automated deletion jobs,
not by manual cleanup.

## Schedule

Customer transaction records: 8 years from transaction date, driven by tax law.
Application and access logs: 400 days. Authentication logs: 400 days. Employee records: 7
years after exit. Recruitment records for unsuccessful candidates: 12 months. Marketing
consent records: for the life of the consent plus 3 years. CCTV: 90 days.

## Deletion requests

A verified data subject deletion request is executed within 30 days across primary stores,
backups on their next rotation, and analytics extracts. Records under a legal hold are
exempt and the requester is informed of the exemption.

## Backups

Backups follow a 35-day rotation. A record deleted from the primary store persists in
backups until the rotation completes; this is disclosed in the privacy notice.

## Legal hold

A legal hold suspends all automated deletion for the scoped records and is released only by
the legal team in writing.
