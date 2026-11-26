# Metadata lifecycle and staging engine

## Processing stages and gates

| Stage | Work | Required evidence | Failure disposition |
|---|---|---|---|
| DISCOVER | Enumerate sources, connectors, directories, tools, skills, libraries and registries | Source identity, owner, connector capability | HELD if source cannot be identified |
| PREFLIGHT | Access, rights, privacy, sensitivity, security, scope and format checks | Versioned preflight report | QUARANTINED / REJECTED |
| INGEST | Capture metadata, schemas, lineage, IDs, baselines, usage statistics and contracts | Source snapshot, timestamps, source cursor | RETRYABLE_FAILURE |
| NORMALIZE | Map source-specific metadata to canonical envelope | Mapping version and validation result | HELD on lossy/ambiguous mapping |
| DEDUPLICATE | Match source key, native ID, version and digest | Match rationale and conflict record | RECONCILIATION_REQUIRED |
| CATALOG | Persist canonical asset record and relationships | Database transaction and catalog ID | RETRYABLE_FAILURE |
| ENRICH | Add controlled vocabulary, references, derived features and embeddings | Enrichment provenance and model/version | Keep base record; enrichment can fail independently |
| CLASSIFY | Assign discipline, asset type, sensitivity, rights and risk | Taxonomy version, confidence, reviewer if required | HELD if high-risk or uncertain |
| GOVERN | Evaluate policy, obligations, access, retention and admission | Policy evaluation and approval references | DENIED / HELD |
| OBSERVE | Monitor freshness, usage, quality, lineage drift and connector health | Metrics and observation window | STALE / DEGRADED |
| ACT | Execute authorized correction, re-index, migration or export | Authorization, change plan, rollback plan | No-op or rollback |
| REVIEW | Human review of material classifications, exceptions and regulatory controls | Review decision and reviewer | HELD |
| AUDIT | Verify provenance, digest, permissions and output trail | Audit report | FAILED / UNKNOWN |
| REFINE | Update mappings, thresholds, taxonomies and policies under version control | Change record and regression results | Retain prior version |
| LEARN | Feed validated findings into engineering knowledge | Approved lesson, source links and confidence | Candidate knowledge only |

## Canonical lifecycle states

`DISCOVERED, PREFLIGHTED, CAPTURED, NORMALIZED, DEDUPLICATED, CATALOGUED, ENRICHED, CLASSIFIED, HELD, QUARANTINED, GOVERNED, ADMITTED, OBSERVED, STALE, REVIEW_REQUIRED, VERIFIED, REJECTED, SUPERSEDED, RETIRED, RETRYABLE_FAILURE, PERMANENT_FAILURE`.

State transitions are append-only events. `ADMITTED` requires a human decision where the asset is restricted, consequential, public-facing or otherwise designated by policy. Technical validation alone does not confer admission.

## Staging bands

- **S0 — DISCOVERED:** source known, no payload captured.
- **S1 — PREFLIGHTED:** scope and risk checks completed; no unresolved hard-stop.
- **S2 — CAPTURED:** source metadata and provenance captured, quarantined if required.
- **S3 — NORMALIZED:** canonical schema valid; source-native values retained.
- **S4 — CATALOGUED:** relational record, lineage and identity committed.
- **S5 — ENRICHED:** optional vocabulary, semantic features and graph edges added with provenance.
- **S6 — GOVERNED:** policy and rights decisions recorded.
- **S7 — VERIFIED:** independent integrity, quality and evidence checks passed.
- **S8 — ADMITTED:** authorized publication/use decision recorded.

Stages are not a numeric trust score. A hard-stop at any stage blocks promotion. Reprocessing creates a new assessment version and does not erase previous decisions.

## Quality assessment model

Score dimensions independently on 0–4: completeness, validity, consistency, uniqueness, timeliness, lineage coverage, integrity, and fitness-for-purpose. Each dimension needs a measured denominator, method, observation window and evidence URI. Use `NOT_MEASURED` rather than zero where no test was run.

Do not use a single aggregate as an admission gate. Report the vector of scores, missingness, critical failures and confidence. A high score cannot override a privacy, rights, security or provenance hard-stop.

## Ingestion envelope

Capture source ID, source-native ID, source URI, source version/cursor, collected_at, observed_at, event time if known, connector/version, schema version, raw metadata digest, canonical record digest, transformation chain, rights/classification preflight, and idempotency key. Cursor advancement occurs only after the metadata transaction and evidence event are durable.

## Asynchronous processing guarantees

Use at-least-once delivery with idempotent consumers. Persist jobs, leases, retry count, next_attempt_at, checkpoint and dead-letter reason. Use transactional outbox when publishing events after a relational transaction. Exactly-once delivery across independent services is not assumed.

A worker must be bounded by concurrency, execution time, payload size and provider budget. Honor Retry-After; use exponential backoff with jitter; open a circuit breaker on sustained provider failures. A failed enrichment must not invalidate a successfully catalogued base record.

## Migration and schema evolution

- Version schemas and mappings independently.
- Prefer additive changes; define deprecation windows and compatibility tests.
- Preserve source-native metadata alongside normalized fields.
- Backfill in bounded batches with checkpoints and idempotency.
- Produce before/after counts, nullability deltas, rejected rows and digest manifests.
- Rehearse rollback or forward-repair on a copy before production.
- Do not migrate, delete or overwrite source records without explicit authorization.
