# Metadata storage and research search architecture

## System-of-record hierarchy

1. **Source systems** own original operational data and permissions.
2. **Relational metadata database** owns the canonical TWGT asset catalogue, source inventory, classifications, policy decisions, lineage edges, review states, jobs and audit indexes.
3. **Object storage** holds approved evidence bundles, immutable snapshots, manifests and preserved payloads subject to rights and retention.
4. **Vector index** is a rebuildable derived index for semantic retrieval.
5. **Knowledge graph** represents typed relationships and cross-repository traceability; it may initially be implemented as relational edge tables.
6. **Research interface** queries the catalogue and authorized source adapters; it does not become a separate truth store.

## Required relationships

`ASSET → SOURCE`, `ASSET → OWNER`, `ASSET → CLASSIFICATION`, `ASSET → POLICY`, `ASSET → REQUIREMENT`, `ASSET → ADR`, `ASSET → SCHEMA`, `ASSET → TOOL/SKILL/AGENT`, `ASSET → WORKFLOW`, `ASSET → EVIDENCE`, `ASSET → REGULATION/STANDARD`, `ASSET → DERIVED_ASSET`.

Relationships are typed, directional where appropriate, timestamped, versioned and provenance-bearing.

## Suggested relational entities

- `source_system`, `connector`, `source_checkpoint`
- `asset`, `asset_version`, `asset_identifier`
- `asset_relation`, `asset_lineage`
- `classification_assignment`, `rights_assessment`
- `quality_assessment`, `policy_evaluation`
- `regulatory_reference`, `applicability_assessment`, `control_evidence`
- `ingestion_job`, `outbox_event`, `dead_letter`
- `audit_event`, `approval_record`, `retention_event`

Use unique constraints for (source_system, source_native_id, source_version) and idempotency keys. Preserve aliases and historical IDs.

## Semantic search constraints

- Embed only content approved for the embedding provider and storage region.
- Store model/provider/version, dimensions, source asset/version, timestamp and digest with each vector.
- Enforce access filters before returning candidate results and again before fetching source content.
- Treat embeddings as derived personal/confidential data when source content is sensitive.
- Deletion, correction and rights changes must trigger vector and cache invalidation.
- Search results must expose evidence links, freshness and classification, not just similarity scores.
- Do not let semantic similarity upgrade evidence class or verification state.

## Research interface requirements

MVP views:
1. Global asset search with filters for discipline, type, source, owner, classification, lifecycle and freshness.
2. Asset detail with metadata, schema, provenance, lineage, quality vector and policy decisions.
3. Research paper/standard detail with DOI/official source, version, evidence status and linked engineering assets.
4. Repository and directory inventory with commit baseline and file-category counts.
5. Regulatory catalogue with applicability, owner, next review and open gaps.
6. Ingestion operations with queue depth, age, retries, dead letters and connector freshness.
7. Audit trail and output citation explorer.

The interface should be read-only in the first release. Any write or lifecycle promotion is a separately authorized workflow.
