# TWGT Review Archive — MVP

## Mission

Preserve GitHub engineering review signals as attributable, replayable evidence without allowing email content, model inference, or external integrations to authorize repository changes.

This archive is an evidence and workflow boundary for the `agentnotebooklm` repository. It is not a replacement for TWGT's schema gate, bridge, persistence service, or human approval boundary.

## Current implementation boundary

The repository currently contains a Next.js 15 / React 19 research application. Its documented application path uses Firecrawl search/scrape and LangGraph orchestration (`lib/firecrawl.ts`, `lib/langgraph-search-engine.ts`); the existing API route inspected is an environment-presence check (`app/api/check-env/route.ts`). No `.github/workflows/` directory was present on the inspected `main` branch. The repository does not currently demonstrate a durable archive queue, Gmail OAuth consumer, event outbox, or replay worker.

This change therefore establishes the archive contract, sanitized source registry, event schema, and a read-only registry validation workflow. It does **not** claim that Gmail ingestion or background processing is live.

## Trust boundaries

1. Gmail is an intake source only. Message bodies and attachments are untrusted input.
2. The public GitHub registry stores sanitized metadata and public GitHub evidence links only. Do not commit email bodies, private message/thread IDs, recipient addresses, OAuth tokens, or attachments.
3. GitHub API reads and workflow runs produce observations, not authorization.
4. Agent-generated summaries are `INFERENCE` until corroborated by source evidence.
5. Repository mutations, PR creation, merges, permission changes, and outbound email require a separate explicit human authorization.
6. External research and provider adapters remain outside the TWGT Core until evaluated and governed.

## Processing lifecycle

`DISCOVERED → CAPTURED → NORMALIZED → DEDUPLICATED → CLASSIFIED → CORROBORATED → ARCHIVED → REVIEWED → VERIFIED`

Terminal/exception states: `HELD`, `REJECTED`, `RETRYABLE_FAILURE`, `PERMANENT_FAILURE`.

Each event carries a stable source key, source timestamp, observed-at timestamp, content digest, provenance, and a state transition history. A retry must reuse the same idempotency key. A duplicate must not create a second logical archive record.

## Asynchronous integration target

- **Intake adapter:** Gmail API OAuth or an explicitly exported `.eml` bundle. The Gmail label `git reviews` is a source selector, not a credential.
- **GitHub adapter:** read repository, pull request, review, workflow run, and commit evidence. Keep least-privilege `contents: read` / `pull-requests: read` where possible.
- **Queue:** durable database-backed job table with transactional outbox; do not use in-memory promises as a durable queue.
- **Worker:** bounded concurrency, leases, exponential backoff with jitter, dead-letter state, cancellation, and replay by event ID.
- **Archive:** immutable event/evidence records; derived summaries are versioned separately.
- **Verification:** compare each claim with its cited GitHub or scholarly source; emit `CURRENT`, `STALE`, `FAILED`, or `UNKNOWN`.
- **Human gate:** no automated merge, permission grant, PR approval, or outbound email.

A future implementation may use Postgres for the durable job/outbox store and object storage for large immutable payloads. The current repository inspection does not establish either as configured; provider selection and credentials remain deployment decisions.

## Registry

- `registry/review-source-registry.json`: sanitized source/repository observations from the `git reviews` label.
- `schemas/archive-event.schema.json`: canonical archive event envelope.

The registry intentionally contains public repository and workflow URLs rather than private Gmail message identifiers or raw email contents.

## Operational runbook

1. Import or select a message from the Gmail `git reviews` label through an authorized Gmail OAuth integration or a local export.
2. Strip credentials, tokens, personal addresses, and unnecessary message body content before persistence.
3. Normalize the GitHub repository, PR/commit/run URL, event time, and failure/review category.
4. Fetch the linked GitHub resource independently. Keep email statements as `CLAIM` until corroborated.
5. Calculate a SHA-256 digest over canonicalized retained evidence; store source and transform metadata.
6. Append a state transition; never silently overwrite an earlier verdict.
7. Generate a human-readable report with links to source evidence.
8. Keep unresolved or unsupported items in `HELD`; do not promote them to verified facts.

## Mission scorecard

| Measure | Target | Failure signal |
|---|---:|---|
| Provenance completeness | 100% of archived events | Missing source URI, time, or digest |
| Idempotent ingestion | 100% duplicate suppression | Duplicate logical event |
| Evidence coverage | 100% claims linked to a source | Summary without evidence URI |
| Recovery | Replayable after worker restart | Lost or double-processed job |
| Human authorization | 100% of mutations gated | Autonomous merge/send/write |
| Freshness | Explicit last-checked timestamp | Old evidence represented as current |

Do not optimize for message volume or number of agent actions. Optimize for correct attribution, low duplicate rate, recoverability, and verified outcomes.

## Rollout milestones

- **M0 — Contract (this change):** registry, event schema, validation workflow, source-grounded baseline.
- **M1 — Read-only intake:** Gmail OAuth or local export adapter; cursor/checkpoint and deduplication.
- **M2 — Durable processing:** Postgres job/outbox, leases, retry/dead-letter/replay.
- **M3 — Corroboration:** GitHub API adapter, PR review/workflow-run evidence, citation checks.
- **M4 — Controlled operations:** human-approved draft reports/PRs; no automatic merge.
- **M5 — Resilience:** failure injection, backup/restore, provider outage and offline replay drills.

## Limits

- A Gmail label is not a GitHub webhook and does not itself provide a push event to GitHub Actions.
- GitHub Actions scheduled workflows are not a substitute for a durable queue; schedules may be delayed or disabled after repository inactivity.
- Exactly-once delivery across Gmail, GitHub, and a database is not assumed. Use at-least-once delivery plus idempotent processing.
- A green functional test does not prove compliance with repository review constraints; preserve both test and review evidence.
- The 2050 continuity horizon is a design objective, not a current service-level guarantee.

## Federated engineering research and library catalogues

The current research/discovery seed is intentionally metadata-first and read-only:

- `governance/PROGRAM.md` — archive mission, three disciplines, boundaries and governance controls.
- `architecture/metadata-lifecycle.md` — staging bands, lifecycle gates, quality and asynchronous processing.
- `architecture/federated-research-ingestion.md` — Wikipedia, DeepWiki, arXiv and engineering-library adapters.
- `architecture/storage-and-search.md` — relational catalogue, object evidence, vector index and research interface.
- `registry/source-inventory.json` — source-system registry and connector states.
- `registry/knowledge-source-seeds.json` — selected Wikipedia, DeepWiki and arXiv starting sources.
- `registry/engineering-library-catalog.json` — 39 seeded engineering libraries, standards and TWGT repositories.
- `registry/research-paper-catalog.json` — six selected research papers with DOI registry checks and evidence limitations.
- `research/ENGINEERING-RESEARCH-HARVEST-2026-11.md` — research synthesis and TWGT implementation mapping.
- `policies/preflight-classification.md`, `policies/regulatory-performance-reviews.md`, `policies/output-audit-trails.md` — governance controls.

**Harvest status:** catalogue and research seed records have been committed to this feature branch. This does not mean that continuous Wikipedia, DeepWiki, arXiv or package-registry ingestion workers are deployed. The source adapters, durable queue, scheduler, access controls and operational monitoring remain implementation work. See `architecture/federated-research-ingestion.md`.
