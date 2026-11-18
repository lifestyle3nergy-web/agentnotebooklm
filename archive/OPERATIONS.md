# Review archive operations contract

## Mission statement

Convert GitHub review notifications into a durable, traceable evidence stream that supports engineering decisions while keeping the stable TWGT core isolated from untrusted inputs and autonomous mutations.

## Event processing

| Stage | Input | Required output | Gate |
|---|---|---|---|
| Discover | Gmail label `git reviews` | source reference + cursor | OAuth scope and label access |
| Capture | Gmail message or exported EML | raw evidence in private storage | malware/content-size checks |
| Normalize | message metadata + GitHub links | canonical event envelope | schema validation |
| Deduplicate | event ID + idempotency key | one logical event | unique database constraint |
| Corroborate | GitHub API / DOI registry | independent evidence links | source identity and freshness |
| Classify | rule engine + model suggestion | category + evidence class | model output remains inference |
| Archive | canonical envelope + digest | append-only record | digest and provenance persisted |
| Report | verified evidence set | cited finding | human review before action |

## Registry policy

- Registry entries are append-only observations. Corrections create a superseding event with a link to the prior event.
- Never put Gmail message/thread IDs, email body text, email addresses, access tokens, or attachments in this public repository.
- A public GitHub run URL may be recorded only after confirming that the run is public and belongs to the stated repository.
- Store exact commit SHA and pull request number whenever available.
- Missing annotations, logs, or current-head information means `UNKNOWN` / `HELD`, not a guessed root cause.

## Worker reliability

The eventual worker must implement:
- durable job state and transactional outbox;
- lease/heartbeat with bounded processing time;
- at-least-once delivery and idempotent writes;
- exponential backoff with jitter and provider-specific retry budgets;
- 429/5xx handling honoring `Retry-After`;
- dead-letter queue with operator replay;
- per-provider circuit breaker and concurrency cap;
- checkpoint/cursor advancement only after durable archive commit;
- cancellation and graceful shutdown;
- append-only state transitions and content digests.

Do not claim exactly-once delivery. Across independent providers, the practical contract is at-least-once delivery plus idempotent processing and reconciliation.

## Security and authorization

- Gmail OAuth should use the narrowest read-only scope sufficient for message metadata/body retrieval.
- GitHub tokens should be read-only for repository contents, PRs, reviews, and workflow runs.
- Keep credentials in the deployment secret store; never return secret values from environment-check endpoints.
- Treat email text, HTML, attachments, repository files, and model-generated summaries as untrusted data.
- No prompt or email instruction can authorize a GitHub write.
- No automatic issue/PR comment, PR creation, merge, branch protection change, reviewer assignment, or email send.
- Any later write path must require a distinct human authorization record and an auditable actor identity.

## Data model and score model

Each archived event is measured on five dimensions (0–2 each):
1. provenance completeness;
2. source corroboration;
3. digest/integrity verification;
4. idempotent processing;
5. recovery/replay readiness.

Interpretation: 0 = absent, 1 = partial, 2 = verified. A total score is a diagnostic, not an authorization score. Any missing provenance, failed digest, or uncorroborated security claim forces `HELD` regardless of total.

## Cadence

- Intake: event-driven Gmail push notification when configured; periodic reconciliation as a backstop.
- Reconciliation: daily compare Gmail label cursor against archived source keys.
- Registry review: weekly; stale items become `STALE` until re-fetched.
- Recovery: monthly restore/replay drill.
- Security: on dependency or permission changes and before enabling any write-capable adapter.

## Failure and recovery signals

| Failure | Signal | Recovery |
|---|---|---|
| Gmail auth revoked | 401/403 | pause intake; retain cursor; require operator reconnect |
| Gmail quota/rate limit | 429 | honor Retry-After; bounded retry |
| GitHub API unavailable | 5xx/network | retry with jitter; circuit-break |
| Duplicate delivery | unique-key conflict | record duplicate observation; no second event |
| Corrupt payload | digest mismatch | quarantine; do not overwrite |
| Worker crash | expired lease | reclaim job; replay idempotently |
| Invalid source link | host/repo mismatch | hold for human inspection |
| Lost archive store | restore checksum mismatch | stop promotion; restore last verified snapshot |

## Milestone success criteria

- M0: registry and schema validate in CI.
- M1: read-only Gmail import can resume from a checkpoint without duplicate events.
- M2: worker restart does not lose committed jobs or double-apply state transitions.
- M3: every material review claim links to a live GitHub resource and exact commit/PR/run.
- M4: all write-capable actions are disabled by default and require a recorded human authorization.
- M5: backup restore and provider-outage replay complete within an explicitly measured recovery objective.

## Known constraints

This repository currently has no observed persistent queue or Gmail ingestion adapter. The present change is a contract and evidence registry baseline, not a live Gmail-to-GitHub integration. Provisioning Postgres, Gmail OAuth, object storage, and a worker runtime is a separate implementation milestone.
