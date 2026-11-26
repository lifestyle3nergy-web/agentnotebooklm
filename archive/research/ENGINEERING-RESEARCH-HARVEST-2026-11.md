# Engineering intelligence research harvest

**Harvested:** 2026-11-19  
**Repository:** `lifestyle3nergy-web/agentnotebooklm`  
**Scope:** Repository-level agent knowledge, software engineering automation, code review, provenance, metadata lineage and reliable engineering operations.

## Evidence and selection rules

- DOI identifiers below were checked against Crossref or DataCite through CoChat citation verification. This verifies bibliographic identity, not the truth of every research claim.
- Open-access full text was retrieved for the four records marked `FULL_TEXT_READ`.
- arXiv records are preprints unless a peer-reviewed venue is separately identified.
- Search coverage is selective, not exhaustive. The harvest is a starting registry, not a systematic review.
- Numerical benchmark results are paper-reported, not independently replicated by TWGT.

## Selected research records

### R-001 — Know Before Fix: QA-Driven Repository Knowledge Acquisition for Software Issue Resolution

- Authors: Haotian Lin et al.
- Year: 2026
- Identifier: arXiv:2607.11111; DOI: 10.48550/arXiv.2607.11111
- Type/status: arXiv preprint; DOI identity verified; full text read.
- Links: https://arxiv.org/abs/2607.11111 ; https://app.cochat.ai/from/chatgpt/fetch/papers/10.48550/arxiv.2607.11111
- Finding: ACQUIRE separates repository knowledge acquisition from patch generation. A Questioner identifies missing repository knowledge, an Answerer explores the codebase and produces evidence-grounded answers, and a Resolver uses the structured knowledge to work on the issue. The authors report up to a 4.4 percentage-point Pass@1 increase on SWE-bench Verified over representative pre-repair methods.
- TWGT relevance: use an explicit repository-question plan before making a change; require source-file/line/commit evidence for answers; keep knowledge acquisition separate from mutation authorization.
- Limit: reported benchmark result, not an independent TWGT replication.

### R-002 — Prometheus: Towards Long-Horizon Codebase Navigation for Repository-Level Problem Solving

- Authors: Yue Pan et al.
- Year: 2025 arXiv submission; retrieved v2 dated 7 February 2026.
- Identifier: arXiv:2507.19942; DOI identity verified against DataCite.
- Type/status: arXiv record; full text read. The PDF contains a publication-style ACM manuscript but its embedded DOI placeholder is not a reliable final publisher DOI; retain the arXiv identifier as the stable source key until publisher metadata is reconciled.
- Links: https://arxiv.org/abs/2507.19942 ; https://app.cochat.ai/from/chatgpt/fetch/papers/10.48550/arxiv.2507.19942
- Finding: represents a repository as a knowledge graph and uses working memory to retain previously explored context across long-horizon navigation and issue resolution.
- TWGT relevance: repository graph, durable exploration notes, context reuse, and source/commit-aware memory are relevant to the engineering knowledge directory.
- Limit: benchmark performance is author-reported; the arXiv and publisher records need explicit version reconciliation.

### R-003 — SWE-QA-Pro: A Representative Benchmark and Scalable Training Recipe for Repository-Level Code Understanding

- Authors: Songcheng Cai et al.
- Year: 2026
- Venue: Findings of the Association for Computational Linguistics: ACL 2026, pages 16958–16999.
- DOI: 10.18653/v1/2026.findings-acl.837; verified against Crossref; full text read.
- Links: https://aclanthology.org/2026.findings-acl.837/ ; https://app.cochat.ai/from/chatgpt/fetch/papers/10.18653/v1/2026.findings-acl.837
- Finding: benchmark design emphasizes diverse long-tail repositories, executable environments, difficulty calibration and questions that require tool-based exploration rather than direct recall. The paper also describes an SFT/RLAIF training recipe.
- TWGT relevance: evaluate repository understanding against long-tail repositories, real executable environments, configuration/data-plumbing tasks and evidence-grounded QA—not only popular repositories or generated explanations.
- Limit: results are tied to the benchmark's construction, model configurations and evaluation setup.

### R-004 — SoK: Analysis of Software Supply Chain Security by Establishing Secure Design Properties

- Authors: Chinenye Okafor, Taylor R. Schorlemmer, Santiago Torres-Arias and James C. Davis.
- Year: 2024
- Identifier: arXiv:2406.10109; DOI: 10.48550/arXiv.2406.10109; verified against DataCite; full text read.
- Type/status: arXiv preprint.
- Links: https://arxiv.org/abs/2406.10109 ; https://app.cochat.ai/from/chatgpt/fetch/papers/10.48550/arxiv.2406.10109
- Finding: systematizes software supply-chain security patterns around transparency, validity and separation, and maps mechanisms to attack stages and secure design properties.
- TWGT relevance: use these three properties as review dimensions for connector admission, build provenance, package/library adoption and separation between external research and trusted core.
- Limit: SoK synthesis is a research framework; it does not certify a particular implementation.

### R-005 — SWE-Gate: Passing Functional Tests Is Not Enough for Software Engineering Agents

- Authors: Xin He et al.
- Year: 2026
- Identifier: arXiv:2609.04167; DOI: 10.48550/arXiv.2609.04167; verified against DataCite.
- Type/status: arXiv preprint; abstract-level review in this harvest.
- Links: https://arxiv.org/abs/2609.04167 ; https://app.cochat.ai/from/chatgpt/search/papers/10.48550/arxiv.2609.04167
- Finding: proposes a benchmark that tests both functional correctness and review-derived acceptance constraints. Its reported dataset includes 303 repair instances from 75 Python repositories. The abstract reports 221 of 644 functionally passing repairs still failed review constraints.
- TWGT relevance: repository acceptance gates must check functional tests, review instructions, repository policy, security and evidence requirements independently.
- Limit: benchmark and counts are author-reported; full-text and replication review remain outstanding.

### R-006 — SWE Atlas: Benchmarking Coding Agents Beyond Issue Resolution

- Authors: Mohit Raghavendra et al.
- Year: 2026
- Identifier: arXiv:2605.08366; DOI: 10.48550/arXiv.2605.08366; verified against DataCite.
- Type/status: arXiv preprint; abstract-level review in this harvest.
- Links: https://arxiv.org/abs/2605.08366 ; https://app.cochat.ai/from/chatgpt/search/papers/10.48550/arxiv.2605.08366
- Finding: evaluates codebase Q&A, test writing and refactoring with category-specific programmatic and rubric-based checks.
- TWGT relevance: expand agent evaluation beyond issue resolution to repository inventory, documentation QA, test authoring, refactoring, migration and review workflows.
- Limit: benchmark results do not directly predict production reliability.

## Cross-paper synthesis

1. **Acquire evidence before acting.** Repository exploration should produce explicit, source-linked knowledge before a mutation is proposed.
2. **Preserve context over time.** Repository graphs and working memory can reduce repeated traversal, but every memory item must remain linked to a repository commit and freshness state.
3. **Test repository understanding, not just code generation.** Long-tail repositories, executable environments and tool-required questions expose weaknesses hidden by static knowledge.
4. **Review constraints are first-class requirements.** Functional test success is insufficient where review, security, policy, compatibility and provenance constraints exist.
5. **Treat supply-chain trust as a system property.** Transparency, validity and separation should govern connectors, package adoption, build artifacts and evidence.
6. **Measure multiple professional workflows.** Codebase Q&A, test writing, refactoring, issue repair and review should have distinct evaluation protocols.

## TWGT implementation mapping

| TWGT component | Research-derived requirement | Proposed acceptance evidence |
|---|---|---|
| `twgt-device-node` | Read-only repository/source discovery and extraction | Source URL, commit/revision, file manifest, extraction log |
| `engineering-intelligence` | Research synthesis and evaluation | Claim-to-source map, paper version, evaluation record |
| `twgt-knowledge` | Durable, freshness-aware repository memory | Asset IDs, lineage edges, supersession and refresh records |
| `twgt-schema-gate` | Schema and evidence contract enforcement | JSON Schema validation and negative tests |
| `twgt-bridge` | Evidence collection only | EVIDENCE_READY or HELD; no admission/grant |
| `twgt-persist-service` | Durable metadata and audit persistence | Transaction, idempotency and recovery tests |
| `twgt-git-hitl` | Human decision boundary | Explicit authorization and reviewer decision |
| `agentnotebooklm` | Research and archive catalogue | Versioned source records and citations |

## Next research queue

- Repository code intelligence and code property graphs.
- Pull-request review behavior and maintainer acceptance.
- Software testing, mutation testing and independent patch correctness.
- Agent memory, temporal context and stale knowledge detection.
- Data lineage, provenance, FAIR metadata and digital preservation.
- Software supply-chain attestations, SBOMs, reproducible builds and signing.
- Distributed systems failure testing, durable workflows and recovery.

## Sources and technical documentation

- arXiv API User Manual: https://info.arxiv.org/help/api/user-manual.html
- MediaWiki Action API: https://www.mediawiki.org/wiki/API:Action_API/en
- MediaWiki revisions API: https://www.mediawiki.org/wiki/API:Revisions/en
- DeepWiki: https://deepwiki.com/
- DeepWiki-Open ingestion overview: https://deepwiki.com/AsyncFuncAI/deepwiki-open/3-getting-started
- OpenLineage facets: https://openlineage.io/docs/spec/facets/
- OpenTelemetry Collector: https://opentelemetry.io/docs/collector/
- OTLP specification: https://opentelemetry.io/docs/specs/otlp/
- Temporal durable execution: https://docs.temporal.io/temporal
