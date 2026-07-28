---
doc_id: eng-database-access
title: Production Database Access Controls
department: engineering
classification: confidential
allowed_roles: engineer,security
---

# Production Database Access Controls
## Standing access

No standing write access to production databases. Read access is granted to a named
break-glass role and is time-boxed to four hours per grant.

## Requesting access

Access is requested through the access management portal with a linked incident or change
request. The request routes to the service owner and then to SecOps. Both approvals are
required; a single approval does not grant access.

## Break glass

During a P1 incident the on-call engineer may self-grant read access using the break-glass
path. Break-glass grants are logged, alert the SecOps channel immediately, and are reviewed
within one working day. Abuse of break-glass is a disciplinary matter.

## Query auditing

All production queries executed through the access portal are logged with the executing
user, the statement, the row count returned, and the linked change request. Logs are
retained for 400 days.

## Data masking

Columns classified as personal data are masked in the read path unless the request
explicitly justifies unmasked access and carries a data protection officer approval.
