---
doc_id: eng-deployment-pipeline
title: Deployment Pipeline and Release Gates
department: engineering
classification: internal
allowed_roles: engineer
---

# Deployment Pipeline and Release Gates
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
