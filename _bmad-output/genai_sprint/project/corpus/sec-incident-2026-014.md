---
doc_id: sec-incident-2026-014
title: Incident 2026-014: Credential Stuffing Attempt
department: security
classification: restricted
allowed_roles: security
---

# Incident 2026-014: Credential Stuffing Attempt
## Summary

Between 02:10 and 04:40 IST on 12 June 2026 the authentication edge observed 412,000 login
attempts against 38,000 distinct customer accounts from 1,900 source addresses. The pattern
is consistent with credential stuffing using a third-party breach list.

## Impact

Nine accounts were successfully authenticated. All nine had passwords reused from the public
breach corpus and had not enrolled in multi-factor authentication. No data exfiltration was
observed on those sessions; sessions were terminated within 20 minutes of detection.

## Detection

The velocity rule on failed authentications per source ASN fired at 02:34. Time to detect
was 24 minutes. Time to contain was 2 hours 6 minutes.

## Response

Blocked the offending ASN ranges at the edge, forced password reset on the nine accounts,
and enforced mandatory MFA enrolment for all accounts appearing in the breach corpus.

## Follow-up actions

Reduce the velocity rule threshold from 200 to 60 failures per minute per ASN. Ship
credential-breach checking at password set time. Both actions are tracked to closure by the
SecOps lead. This report is restricted to the security function.
