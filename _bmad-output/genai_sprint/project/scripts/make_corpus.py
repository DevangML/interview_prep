"""Generate the synthetic enterprise corpus.

Why synthetic: I need a corpus where I know the ground truth for every question,
so that Recall@k is a real measurement and not a vibe. 16 documents across 5
departments, 4 classification levels, 5 roles.

Front matter carries the ACL. That is the whole point of this project: the
permission lives on the DOCUMENT at ingest time, is inherited by every CHUNK,
and is therefore available to the retriever as a filter predicate.

Run:  python scripts/make_corpus.py
"""

from pathlib import Path

CORPUS_DIR = Path(__file__).resolve().parents[1] / "corpus"

# (doc_id, title, department, classification, allowed_roles, body)
DOCS = [
    (
        "hr-leave-policy", "Leave and Time Off Policy", "hr", "internal",
        ["employee", "engineer", "finance", "hr", "security"],
        """
## Annual leave entitlement

All confirmed full-time employees accrue 21 days of paid annual leave per calendar
year, accrued at 1.75 days per completed month of service. Contractors and interns
accrue leave on a pro-rata basis and are not eligible for leave encashment.

## Carry forward and lapse

A maximum of 10 unused annual leave days may be carried into the next calendar year.
Days above that cap lapse on 31 December and are not encashable. Carried-forward days
must be consumed before 31 March or they lapse.

## Sick leave

12 days of paid sick leave per year. A medical certificate is required for any absence
of three or more consecutive working days. Sick leave does not carry forward and is
not encashable on exit.

## Applying for leave

Leave requests are raised in the HR portal and route to the reporting manager. Requests
of five or more consecutive days require a second-level approval from the department
head. Approval turnaround target is two working days.

## Leave during notice period

Annual leave cannot be taken during the notice period without written approval from the
department head, and approved leave extends the notice period by an equal number of days.
""",
    ),
    (
        "hr-onboarding", "New Joiner Onboarding Checklist", "hr", "internal",
        ["employee", "engineer", "finance", "hr", "security"],
        """
## Day zero: before the joiner arrives

HR raises an onboarding ticket at least three working days before the start date. The
ticket triggers three parallel workstreams: identity provisioning with SecOps, asset
allocation with IT, and payroll registration with Finance.

## Identity provisioning

SecOps creates the directory account, assigns the baseline employee role, and enrols the
joiner in multi-factor authentication. Role assignments beyond the baseline require an
approved access request referencing the joiner's designation. Default clearance for a new
joiner is internal; confidential clearance is granted only on manager request with
justification.

## Asset allocation

IT issues a laptop and, where the role requires it, a handheld scanner or an access badge.
Asset serial numbers are recorded against the employee ID for the asset audit trail.

## Day one

Induction session covering the code of conduct, information security basics, the expense
policy, and the leave policy. The joiner acknowledges the information security policy in
writing; this acknowledgement is an audit artefact.

## Probation and confirmation

Standard probation is six months. Confirmation requires a documented manager review.
Access granted on a temporary basis during probation is re-reviewed at confirmation.
""",
    ),
    (
        "hr-compensation-bands", "Compensation Bands FY2026", "hr", "restricted",
        ["hr"],
        """
## Band structure

The company operates seven compensation bands, B1 through B7. Bands are defined by scope
of ownership, not by years of service. Band placement is reviewed annually.

## Engineering bands

B2 Associate Engineer: 6.0 to 9.5 LPA fixed. B3 Engineer: 9.5 to 16.0 LPA fixed.
B4 Senior Engineer: 16.0 to 26.0 LPA fixed. B5 Staff Engineer: 26.0 to 40.0 LPA fixed.
Variable pay is 10 percent of fixed at B2 to B4 and 15 percent at B5 and above.

## Non-engineering bands

Finance, HR, and operations roles map to the same seven bands with a fixed-pay range that
is 8 to 12 percent lower at equivalent band, offset by a lower variable component.

## Increment cycle

Annual increments are effective 1 April. The company-wide increment budget for FY2026 is
9.2 percent of the fixed payroll, distributed on a forced-distribution performance curve.

## Confidentiality

Individual compensation, band placement, and the increment budget are restricted. Sharing
band ranges outside the HR function is a disciplinary matter under the code of conduct.
""",
    ),
    (
        "hr-grievance-procedure", "Grievance and Whistleblower Procedure", "hr", "confidential",
        ["hr", "security"],
        """
## Scope

This procedure covers workplace grievances, harassment complaints, and whistleblower
reports of financial or ethical misconduct.

## Raising a complaint

A complaint may be raised with the reporting manager, with HR directly, or through the
anonymous ethics hotline. Complaints involving the reporting manager must not be routed
through that manager. Anonymous reports are accepted and investigated.

## Investigation

HR acknowledges within two working days and appoints an investigating officer within five.
Where the complaint involves potential data misuse or system access abuse, SecOps is a
mandatory co-investigator and pulls the relevant access logs.

## Confidentiality and non-retaliation

Complaint records are confidential and access is restricted to the investigating officer,
the HR head, and where applicable the SecOps lead. Retaliation against a complainant is
itself a disciplinary offence.

## Outcome and appeal

The outcome is communicated in writing within thirty working days. Either party may appeal
once, in writing, within ten working days of the outcome.
""",
    ),
    (
        "fin-expense-policy", "Travel and Expense Reimbursement Policy", "finance", "internal",
        ["employee", "engineer", "finance", "hr", "security"],
        """
## Claim window

Expenses must be claimed within 30 days of being incurred. Claims older than 60 days are
rejected automatically by the finance system and require a written exception from the
finance head.

## Domestic travel limits

Accommodation is capped at 4,500 INR per night in tier-1 cities and 3,000 INR elsewhere.
Meal allowance is 1,200 INR per day domestic. Air travel is economy class only; business
class requires prior approval from the department head and the finance head.

## Local conveyance

Cab fares are reimbursed at actuals with a receipt. Personal vehicle usage is reimbursed at
12 INR per kilometre. Claims without a receipt are capped at 500 INR per month in total.

## Approval chain

Claims up to 10,000 INR are approved by the reporting manager. Claims from 10,000 to 50,000
INR require department head approval. Claims above 50,000 INR require finance head approval.

## Payment

Approved claims are paid in the next payroll cycle. The finance team publishes a cut-off
date each month; claims approved after the cut-off move to the following cycle.
""",
    ),
    (
        "fin-quarterly-results-q3", "Q3 FY2026 Internal Financial Summary", "finance", "confidential",
        ["finance", "hr"],
        """
## Revenue

Q3 revenue was 214.6 crore INR, up 11.3 percent year on year and up 3.1 percent quarter on
quarter. Growth was driven by the enterprise SaaS segment, which contributed 62 percent of
revenue against 57 percent in the same quarter last year.

## Margins

Gross margin was 58.4 percent, down 90 basis points sequentially due to higher cloud
infrastructure spend during the warehouse platform migration. Operating margin was 17.2
percent.

## Cost base

Employee cost was 121.0 crore INR, 56.4 percent of revenue. Cloud and infrastructure spend
was 18.9 crore INR, up 22 percent sequentially. The infrastructure increase is expected to
normalise in Q4 once the migration completes.

## Receivables

Days sales outstanding rose to 68 days from 61. Two enterprise accounts contribute 40
percent of the overdue balance and are under active collection.

## Guidance

Full-year revenue guidance is retained at 850 to 870 crore INR. This document is
confidential and must not be shared outside Finance and HR before the earnings release.
""",
    ),
    (
        "fin-vendor-payment-terms", "Vendor Payment Terms and Controls", "finance", "confidential",
        ["finance"],
        """
## Standard terms

Standard payment terms are net 45 days from invoice receipt. Terms shorter than net 30
require finance head approval and are granted only where a documented commercial benefit
exists, such as an early-payment discount above 2 percent.

## Vendor onboarding

A vendor is created in the finance master only after tax registration verification, bank
account verification through a penny-drop test, and a signed master services agreement.
Bank detail changes on an existing vendor require dual approval and an out-of-band callback
to a previously recorded phone number. This control exists because vendor bank-change fraud
is the most common payment fraud vector.

## Three-way match

Payment is released only when the purchase order, the goods or services receipt note, and
the invoice agree on quantity and value within a 2 percent tolerance. Exceptions above
tolerance require a documented approval.

## Segregation of duties

The person who creates a vendor cannot approve a payment to that vendor. The finance system
enforces this at the role level and violations are reported in the monthly controls report.
""",
    ),
    (
        "eng-oncall-runbook", "Production On-Call Runbook", "engineering", "internal",
        ["engineer", "security"],
        """
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
""",
    ),
    (
        "eng-deployment-pipeline", "Deployment Pipeline and Release Gates", "engineering", "internal",
        ["engineer"],
        """
## Branch model

Trunk-based development on main. Feature work happens on short-lived branches merged behind
a feature flag. Release branches are cut weekly and are patch-only after cut.

## Gates

A merge to main requires: unit tests passing, coverage not decreasing, static analysis
clean, and one approving review from a code owner. A release to production additionally
requires the integration suite green against the staging tenant and a signed-off release
note.

## Environments

Four environments: local, dev, staging, production. Staging carries an anonymised copy of
production data refreshed weekly. Production data is never copied to dev.

## Feature flags

Every user-visible change ships behind a flag defaulting to off. Flags are removed within
two release cycles of full rollout; stale flags are tracked as technical debt in the weekly
engineering review.

## Rollback and forward-fix

Rollback is the default response to a bad release. Forward-fix is allowed only when the
release includes an irreversible schema migration, which itself requires an architecture
review before merge.
""",
    ),
    (
        "eng-api-rate-limits", "Public API Rate Limits and Error Codes", "engineering", "public",
        ["employee", "engineer", "finance", "hr", "security"],
        """
## Rate limits

The public API allows 600 requests per minute per API key on the standard tier and 3,000
requests per minute on the enterprise tier. Burst capacity is 2x the sustained limit for up
to 10 seconds, implemented as a token bucket.

## Rate limit responses

Exceeding the limit returns HTTP 429 with a Retry-After header in seconds and an
X-RateLimit-Remaining header on every response. Clients must honour Retry-After; clients
that retry immediately are throttled more aggressively by the edge.

## Error codes

400 invalid request payload. 401 missing or invalid credentials. 403 authenticated but not
authorised for the resource. 404 resource not found or not visible to the caller. 409
conflict on a concurrent write. 422 semantically invalid. 429 rate limited. 5xx server side.

## Idempotency

Write endpoints accept an Idempotency-Key header. A repeated request with the same key
returns the original response rather than performing the operation twice. Keys are retained
for 24 hours.

## Pagination

Cursor-based pagination with a default page size of 50 and a maximum of 200. Offset
pagination is not supported because it is unstable under concurrent writes.
""",
    ),
    (
        "eng-database-access", "Production Database Access Controls", "engineering", "confidential",
        ["engineer", "security"],
        """
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
""",
    ),
    (
        "sec-incident-2026-014", "Incident 2026-014: Credential Stuffing Attempt", "security", "restricted",
        ["security"],
        """
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
""",
    ),
    (
        "sec-access-review-sop", "Quarterly User Access Review SOP", "security", "confidential",
        ["security", "engineer"],
        """
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
""",
    ),
    (
        "sec-phishing-guidance", "Phishing Awareness Guidance", "security", "public",
        ["employee", "engineer", "finance", "hr", "security"],
        """
## What to look for

Unexpected urgency, a mismatch between the display name and the actual sender address, a
link whose visible text differs from its destination, and any request to move money or
change bank details outside a normal process.

## What we will never ask

The IT service desk will never ask for your password, never ask for a multi-factor code,
and never ask you to install software from a link in an email.

## Reporting

Use the Report Phish button in the mail client. Reporting a legitimate mail by mistake costs
nothing; not reporting a real one is expensive. Median triage time for a reported mail is
under 30 minutes.

## If you clicked

Disconnect from the network, do not power off the machine, and call the SecOps hotline.
Preserving the running state helps the investigation. There is no penalty for reporting your
own mistake quickly; the penalty is for hiding it.

## Payment fraud

Any request to change vendor bank details is treated as fraudulent until verified by an
out-of-band callback to a previously recorded number. This applies even when the request
appears to come from a known contact.
""",
    ),
    (
        "legal-data-retention", "Data Retention and Deletion Schedule", "legal", "internal",
        ["employee", "engineer", "finance", "hr", "security"],
        """
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
""",
    ),
    (
        "legal-msa-acme", "Master Services Agreement: Acme Logistics", "legal", "restricted",
        ["finance", "security"],
        """
## Commercial terms

Three-year term commencing 1 April 2026, auto-renewing for successive one-year terms unless
either party gives 90 days written notice. Annual contract value 4.8 crore INR with a 6
percent uplift at each renewal.

## Service levels

Platform availability commitment of 99.9 percent measured monthly, excluding scheduled
maintenance notified 5 working days in advance. Service credits are 5 percent of the monthly
fee for each 0.1 percent below commitment, capped at 25 percent of the monthly fee.

## Data protection

Acme data is processed in-country only. Sub-processors require prior written approval. A
personal data breach affecting Acme data must be notified within 24 hours of confirmation,
which is stricter than our statutory obligation.

## Liability

Liability is capped at 12 months of fees paid, uncapped for breach of confidentiality, data
protection breach, and wilful misconduct.

## Termination

Either party may terminate for material breach uncured after 30 days written notice. On
termination Acme data is returned in a machine-readable format within 30 days and deleted
within 60.
""",
    ),
]


def main() -> None:
    CORPUS_DIR.mkdir(parents=True, exist_ok=True)
    for doc_id, title, dept, classification, roles, body in DOCS:
        front = [
            "---",
            f"doc_id: {doc_id}",
            f"title: {title}",
            f"department: {dept}",
            f"classification: {classification}",
            f"allowed_roles: {','.join(roles)}",
            "---",
            "",
            f"# {title}",
        ]
        text = "\n".join(front) + "\n" + body.strip() + "\n"
        (CORPUS_DIR / f"{doc_id}.md").write_text(text, encoding="utf-8")
    print(f"wrote {len(DOCS)} documents to {CORPUS_DIR}")


if __name__ == "__main__":
    main()
