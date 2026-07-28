---
doc_id: eng-api-rate-limits
title: Public API Rate Limits and Error Codes
department: engineering
classification: public
allowed_roles: employee,engineer,finance,hr,security
---

# Public API Rate Limits and Error Codes
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
