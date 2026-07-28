---
doc_id: sec-access-review-sop
title: Quarterly User Access Review SOP
department: security
classification: confidential
allowed_roles: security,engineer
---

# Quarterly User Access Review SOP
## Purpose

The quarterly user access review certifies that every active entitlement is still justified
by the holder's current role. It is the primary detective control against privilege creep.

## Scope

All production systems classified tier 1 and tier 2, all directory groups conferring
administrative rights, and all standing database roles.

## Process

SecOps extracts the entitlement snapshot on the first working day of the quarter. The
snapshot is decomposed into review packets by system owner. Each owner certifies, for every
user, one of three outcomes: retain, revoke, or modify. A non-response after two reminders
is treated as revoke, because default-deny is the only safe failure mode in access review.

## Evidence

Every certification decision is recorded with the certifier identity, timestamp, and the
entitlement snapshot hash, so the decision can be reconstructed at audit.

## Revocation

Revocations are executed in bulk after the review window closes. Bulk revocation runs only
against a validated change request; the automation refuses to execute without one.

## Metrics

Target certification completion is 100 percent within 15 working days. Privilege creep is
measured as the percentage of entitlements revoked at review; a rising number indicates
weak joiner-mover-leaver hygiene upstream.
