# TWGT Archive Metadata Governance Program

**Program owner:** TWGT Engineering Intelligence governance  
**Archive repository:** `lifestyle3nergy-web/agentnotebooklm`  
**Program state:** Proposed architecture; controls become operational only when implemented and tested.

## Mission

Maintain a durable, searchable, evidence-linked inventory of engineering knowledge and digital assets. Preserve source ownership, provenance, rights, classification, quality, lineage, lifecycle decisions and audit history. Support research and engineering decisions without turning the archive into an uncontrolled copy of every connected system.

## Three governing disciplines

1. **Computer science and software engineering:** source code, repositories, architecture, interfaces, algorithms, models, dependencies, tests, builds, deployment and runtime evidence.
2. **Data science and information engineering:** metadata, datasets, schemas, lineage, catalogues, semantic search, quality, analytics and knowledge graphs.
3. **Governance, risk and regulatory engineering:** identity, access, rights, privacy, retention, policy, risk, regulatory applicability, audit and controlled change.

Cross-disciplinary assets may have multiple classifications. The primary discipline is a navigation aid, not a substitute for security classification or legal assessment.

## Program boundaries

- This repository is the **metadata dump, registry, evidence index and research interface**. It is not the system of record for connected source data.
- Each connected repository, database, service, tool, skill, library or archive remains authoritative for its own operational content.
- Store metadata, references, checksums, lineage and approved derived summaries by default. Do not mirror raw content unless rights, privacy, security, retention and storage approval are recorded.
- The Internet Archive (archive.org) is an optional external preservation and discovery source/target. It is not assumed to be a TWGT partner, a guaranteed storage provider, a private data processor, or the canonical metadata database.
- No upload, metadata modification, deletion, public exposure, GitHub write, or outbound message is permitted without a separate explicit authorization record and applicable rights review.
- Agent output is a recommendation until independently validated. Registry status is not a legal compliance certificate.

## Lifecycle

`DISCOVER → PREFLIGHT → INGEST → NORMALIZE → CATALOG → ENRICH → CLASSIFY → GOVERN → OBSERVE → ACT → REVIEW → AUDIT → REFINE → LEARN`

A lifecycle stage may hold, quarantine, reject, retry or supersede a record. Never skip a failed gate by silently changing its status.

## Required metadata for every catalogued asset

- stable `asset_id` and source-native identifier;
- source system, source URI, connector and collection timestamp;
- title, description, asset type, discipline and controlled vocabulary terms;
- owner/steward, responsible system and contact role (not personal contact data by default);
- created/modified/observed timestamps and version or commit;
- schema/format, size or record count where available;
- lineage: upstream sources, transformations, tools, versions and downstream uses;
- evidence class, provenance, content digest where permitted, and verification status;
- classification, privacy/rights status, residency, retention and permitted-use boundaries;
- quality dimensions, score, assessment method, assessment timestamp and exceptions;
- lifecycle state, policy version, approvals and immutable audit-event references.

Unknown values remain explicitly unknown. Do not fabricate owners, usage counts, quality scores or regulatory applicability.

## Central architecture

- **Relational metadata store:** canonical asset records, source registry, ownership, classification, policy decisions, lifecycle states, reviews and audit indexes.
- **Object storage:** approved immutable evidence bundles, snapshots, large manifests and preserved derivatives; encryption, retention and recovery policy required.
- **Vector index:** derived embeddings for semantic retrieval. Every vector must reference an asset ID, source version, embedding model/version and access policy. Vector search is never the source of truth and must respect source ACLs.
- **Knowledge graph:** typed relations among assets, repositories, requirements, ADRs, schemas, agents, skills, workflows, policies, standards and evidence.
- **Research interface:** search, filter, compare, inspect lineage, inspect citations, review classifications and export approved metadata. It must not expose content merely because its metadata is indexed.

## Preflight classification checks

Before capture or enrichment:
1. Identify source, source owner and lawful/contractual access basis.
2. Determine whether the item contains personal, confidential, security-sensitive, licensed or export-controlled material.
3. Determine allowed operations: metadata-only, local processing, restricted evidence storage, public publication, or prohibited.
4. Check retention, deletion, residency, transfer and rights constraints.
5. Validate source connector scope and credentials; secrets must never enter the archive.
6. Validate schema, format, size limits, malware/content safety and source integrity.
7. Assign provisional classification and confidence; uncertain or high-risk records go to `HELD`.
8. Record the policy version and preflight result.

## Regulatory performance reviews

A regulatory catalogue entry is a monitored reference, not a declaration that a law applies. For every asset class and processing purpose, a competent owner must record jurisdiction, entity role, data subject, activity, scope test, obligations, control mapping, evidence, review date and legal reviewer. Applicability is `APPLICABLE`, `NOT_APPLICABLE_WITH_REASON`, `POTENTIAL` or `UNASSESSED`. Legal interpretation requires qualified review.

Review controls at onboarding, material change, incident, new jurisdiction, new data use, and scheduled intervals. Track overdue reviews and unresolved control gaps.

## Output audit trails and compliance

Every material output must record:
- input asset IDs and exact versions;
- source and retrieval timestamps;
- prompt/template, model/provider/version where AI was used;
- tools, skills, code version and configuration digest;
- transformations, filters, joins and exclusions;
- evidence citations and claim/evidence mapping;
- validation results, reviewer and decision;
- output digest, destination, access classification and retention;
- superseding/correction relationships.

Do not store hidden reasoning or unnecessary personal data. Store concise rationale, reproducible inputs, tool events and verifiable decisions.

## Internet Archive integration policy

Phase 1 is read-only: retrieve public item metadata from `https://archive.org/metadata/{identifier}`, validate the response, preserve the retrieval timestamp and raw-response digest, and map IA-native fields into the TWGT asset schema without overwriting the original fields.

Phase 2 may stage approved preservation packages and metadata mappings. Phase 3 may submit uploads or metadata changes only after:
- rights and license review;
- privacy/security and disclosure review;
- destination collection and identifier approval;
- retention and takedown/correction procedure;
- human authorization;
- pre-upload manifest and digest validation;
- post-upload verification and audit capture.

Internet Archive metadata conventions (for example identifier, title, creator, date, collection, mediatype, licenseurl, rights and subject) are a source-specific mapping, not the TWGT canonical schema. Never set platform-managed fields such as addeddate/publicdate/adder as if they were authoritative local observations.

## Success criteria

- 100% of admitted assets have stable IDs, source identity, observed time and provenance.
- 100% of restricted assets have an access decision before indexing or storage.
- 100% of outputs have reproducible input/version references and audit records.
- Duplicate logical assets are detected and reconciled without erasing source identities.
- Quality scores are explainable and multidimensional; missingness cannot be hidden by averages.
- Every policy and regulatory entry has an owner, version and review date.
- Backup restore, export and re-ingestion are tested against measured recovery objectives.

## Non-goals and limits

This program does not promise that every connected service exposes an API, that every asset can legally be copied, that a vector result is true, that an archive.org upload is permanent, or that a 2050 continuity objective is already achieved. Connector coverage, data quality, legal scope and preservation guarantees must be measured separately.
