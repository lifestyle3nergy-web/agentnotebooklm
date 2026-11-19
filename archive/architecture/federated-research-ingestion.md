# Federated research and engineering library ingestion

## Source adapters

### Wikipedia / MediaWiki

Use the MediaWiki Action API and revisions module for discovery and revision-aware metadata capture. Capture page title, page ID, revision ID, timestamp, canonical URL, language, categories and outbound references. The revisions API supports revision IDs, timestamps and pagination/continuation. See:
- https://www.mediawiki.org/wiki/API:Action_API/en
- https://www.mediawiki.org/wiki/API:Revisions/en

Rules:
- Keep the exact revision identifier; a page title alone is not a reproducible source.
- Preserve attribution and licensing metadata; Wikipedia text is CC BY-SA with other project-specific notices where applicable.
- Use page content as secondary explanatory material. Follow references to primary standards, papers, official docs or source repositories.
- Avoid harvesting entire encyclopedias by default; use topic allowlists and bounded incremental updates.
- Record article revision, retrieved_at, language and citation links. Detect reverts and material changes.

### DeepWiki

DeepWiki is a repository-oriented generated documentation and Q&A surface. Use it for repository discovery, architecture navigation and candidate source-file references:
- https://deepwiki.com/

DeepWiki-Open is an open-source implementation that accepts GitHub/GitLab repository URLs and creates structured wiki pages, diagrams and retrieval-based Q&A. A public DeepWiki-Open analysis documents its source ingestion and RAG pipeline:
- https://deepwiki.com/AsyncFuncAI/deepwiki-open/3-getting-started

Rules:
- DeepWiki-generated explanations are derived summaries, not source authority.
- Capture repository canonical URL, pinned commit SHA (when available), wiki page URL, generation/index time, referenced file paths and line ranges.
- Resolve every substantive claim to the underlying source commit and inspect source files before assigning VERIFIED.
- Keep generated diagrams and answers as derived artifacts with model/provider/version where available.
- Do not assume DeepWiki offers a stable public ingestion API; connector mode remains manual/supported interface until an official API contract is established.
- For private repositories, use an authorized GitHub connector and approved repository access; do not paste private source into third-party systems without approval.

### arXiv / arXiv Labs

Use the arXiv API for discovery and version-aware metadata:
- Official API manual: https://info.arxiv.org/help/api/user-manual.html
- API endpoint: `https://export.arxiv.org/api/query`
- arXiv Labs: https://info.arxiv.org/labs/

Capture arXiv ID, version, title, authors, abstract, categories, submitted/published/updated timestamps, DOI, journal reference, license and withdrawal/replacement notices where available. Use `id_list` for stable ID retrieval; use `search_query` for discovery; page with `start` and `max_results`; follow API etiquette and the recommended delay for sequential requests.

Rules:
- Preserve every version as an immutable source observation; point the logical work to the latest observed version without deleting earlier versions.
- Distinguish preprint, peer-reviewed conference/journal publication, accepted manuscript and publisher version.
- Verify DOI/title/author/year against Crossref or DataCite.
- Check retraction/correction status and reference integrity where relevant.
- arXiv posting is not itself peer review.
- Store bibliographic metadata and abstract by default; full-text copies require license and retention review.

### Engineering libraries and developer tools

Sources include official project docs, GitHub/GitLab repositories, package registries, release feeds, security advisories and license files. Seed catalogue: `registry/engineering-library-catalog.json`.

Required fields:
- canonical project and repository identity;
- official documentation and release source;
- license and SPDX identifier where available;
- current and last-known release/version;
- supported runtimes/platforms;
- maintainer/organization and activity observations;
- dependency and transitive dependency data;
- security advisories and vulnerability status;
- deprecation, end-of-life and support policy;
- installation provenance, package digest and build attestations where available;
- adoption status: DISCOVERED, EVALUATING, APPROVED, PILOT, ADOPTED, DEPRECATED, REJECTED.

Do not infer production readiness from popularity, stars, marketing claims or an AI-generated DeepWiki page.

## Shared ingestion contract

Every source adapter emits the same normalized envelope:

- `source_id`, `source_native_id`, `source_uri`, `source_version`;
- `retrieved_at`, `source_updated_at`, `connector_name`, `connector_version`;
- `asset_type`, `discipline`, `classification`, `rights_status`;
- `raw_metadata_digest`, `canonical_record_digest`;
- `provenance`, `lineage`, `evidence_class`, `verification_status`;
- `policy_version`, `idempotency_key`, `ingestion_run_id`.

Keep source-native metadata in a namespaced field or source payload reference. Normalization must not erase source-specific meaning.

## Asynchronous workflow

1. Scheduler enumerates allowed sources and checks connector health.
2. Discovery worker queries only allowlisted categories, repositories, pages or package names.
3. Preflight checks permissions, rights, privacy, classification, scope and quotas.
4. Capture worker stores raw metadata snapshot/digest and source cursor.
5. Normalizer validates canonical schema and mapping version.
6. Dedup worker resolves source identity and version without conflating forks or mirrors.
7. Catalog worker commits relational record and lineage in one transaction.
8. Outbox publishes enrichment/indexing jobs.
9. Enrichment worker adds taxonomy tags, citations, embeddings and graph edges; each derived output records model/version.
10. Verification worker checks source reachability, identifier consistency, citation validity and selected source claims.
11. Review worker routes uncertain/high-risk classifications to a human steward.
12. Observer detects stale sources, broken links, changed licenses, new releases, schema drift and failed connectors.

At-least-once delivery, idempotency, bounded retries and dead-letter handling are required. Do not claim exactly-once semantics across external services.

## Refresh and retention

- Wikipedia: incremental revision updates for allowlisted pages; detect revision changes and reverts.
- DeepWiki: refresh when repository commit changes; record index age and source commit.
- arXiv: check latest versions and journal references; retain historical version links.
- Libraries: poll releases, advisories, license changes, deprecations and docs version changes.
- Recompute embeddings only when source version or embedding model changes.
- Preserve previous catalog records and decisions; new observations supersede, not overwrite, historical evidence.

## Quality and success metrics

- source coverage by allowed scope;
- metadata completeness by field and source;
- percentage of records with immutable source revision/commit;
- citation and DOI resolution rate;
- stale-record rate and median freshness lag;
- duplicate/conflict rate;
- lineage completeness;
- policy/rights preflight coverage;
- false-positive and false-negative classification rates from human review;
- ingestion latency, retry rate, dead-letter age and connector availability;
- proportion of outputs with complete citations and audit records.

A single composite quality score must not conceal a critical rights, privacy, security or provenance failure.
