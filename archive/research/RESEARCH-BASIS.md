# Research basis for the TWGT review archive

Research snapshot: 2026-11-19. Scholarly records were searched through CoChat and selected full texts were retrieved. Citation metadata for RepoAudit and SWE-Gate was independently resolved against DataCite. Preprints are explicitly marked; search ranking and citation counts are not treated as quality scores.

## Directly applicable research

### 1. Review constraints are separate from functional correctness

**He et al. (2026), “SWE-Gate: Passing Functional Tests Is Not Enough for Software Engineering Agents.”** arXiv preprint, arXiv:2609.04167. [CoChat full-text record](https://app.cochat.ai/from/chatgpt/fetch/papers/10.48550/arxiv.2609.04167) · [arXiv](https://arxiv.org/abs/2609.04167)

The authors construct 303 repository-level repair instances from 75 Python repositories and evaluate functional tests separately from review-derived acceptance constraints. Their abstract reports that 221 of 644 functionally passing repairs still failed review constraints. This directly supports retaining human review constraints, compatibility requirements, and repository conventions as explicit verification criteria rather than treating a green test suite as sufficient.

Evidence status: **preprint**; DOI/arXiv identifier resolved by DataCite. Do not describe it as peer-reviewed.

### 2. Repository auditing needs fact validation, not free-form model confidence

**Guo et al. (2025), “RepoAudit: An Autonomous LLM-Agent for Repository-Level Code Auditing.”** Proceedings of the 42nd International Conference on Machine Learning, PMLR 267. [CoChat full-text record](https://app.cochat.ai/from/chatgpt/fetch/papers/10.48550/arxiv.2501.18160) · [arXiv](https://arxiv.org/abs/2501.18160) · [implementation](https://github.com/PurCL/RepoAudit)

RepoAudit combines demand-driven repository exploration with a validator that checks data-flow facts and path-condition satisfiability before emitting bug reports. Its reported benchmark precision is 78.43% on 40 true bugs across 15 projects. The architectural lesson is to separate candidate generation from independent validation and to preserve false-positive uncertainty.

Evidence status: conference paper; DOI/arXiv identifier resolved by DataCite. Reported results are from the authors' evaluation, not a guarantee for this project.

### 3. Constrained, staged workflows can outperform broad autonomous action

**Xia et al. (2025), “Demystifying LLM-Based Software Engineering Agents.”** Proceedings of the ACM on Software Engineering. [CoChat full-text record](https://app.cochat.ai/from/chatgpt/fetch/papers/10.1145/3715754) · DOI: [10.1145/3715754](https://doi.org/10.1145/3715754)

The paper introduces Agentless, which decomposes repair into localization, repair, and patch validation rather than allowing a general agent to freely choose every next action. The authors report competitive benchmark performance with lower cost than complex agent approaches at the time of study. For this archive, the practical implication is to use bounded, inspectable stages and narrow tools rather than an unconstrained agent with broad GitHub permissions.

Evidence status: peer-reviewed journal/conference proceedings record as indexed by CoChat.

### 4. Verification quality depends on test quality and reproduction

**Mündler et al. (2024), “SWT-Bench: Testing and Validating Real-World Bug-Fixes with Code Agents.”** Advances in Neural Information Processing Systems 37. [CoChat full-text record](https://app.cochat.ai/from/chatgpt/fetch/papers/10.52202/079017-2601) · [arXiv](https://arxiv.org/abs/2406.12952) · [dataset and code](https://github.com/logic-star-ai/SWT-Bench)

SWT-Bench turns repository issue descriptions into test-generation tasks and evaluates whether generated tests fail before the fix and pass after it. The authors report that generated tests can filter proposed fixes and improve repair precision. This supports storing reproduction tests and fail-to-pass evidence alongside patches, rather than only retaining final pass/fail status.

Evidence status: NeurIPS proceedings; the fetched full text is available.

### 5. Benchmarks and evidence need freshness and reproducibility

**Zhang et al. (2025), “SWE-bench Goes Live!”** arXiv preprint, arXiv:2505.23419. [CoChat full-text record](https://app.cochat.ai/from/chatgpt/fetch/papers/10.52202/085713-4923) · [arXiv](https://arxiv.org/abs/2505.23419) · [project](https://swe-bench-live.github.io/)

The paper describes a live-updatable benchmark with 1,319 tasks across 93 repositories and dedicated Docker environments, addressing stale task sets, narrow repository coverage, and manual curation. For TWGT this motivates time-stamped evidence, pinned repository commits, reproducible environments, and scheduled revalidation. It is a preprint, not an independent proof that any particular TWGT workflow is reliable.

### 6. Multi-agent test-driven orchestration

**Han et al. (2026), “TDFlow: Agentic Workflows for Test Driven Development.”** [CoChat full-text record](https://app.cochat.ai/from/chatgpt/fetch/papers/10.18653/v1/2026.eacl-long.70) · [arXiv](https://arxiv.org/abs/2510.23761)

TDFlow separates exploration, patch proposal, per-test debugging, and revision into narrowly scoped agents. Its abstract reports different outcomes when human-written tests are supplied versus when the system must generate its own reproduction tests. The design implication is to preserve a human-defined acceptance contract and separate proposing a change from debugging and verifying it.

Evidence status: full text fetched from an open repository copy; confirm final venue/version metadata before citing it as a peer-reviewed publication.

## Research-derived design decisions

| Research finding | Archive control |
|---|---|
| Functional success can miss review constraints | Store review requirements as first-class acceptance criteria |
| Model-generated bug claims can be false positives | Independent validator and human review for ambiguous findings |
| Broad agent autonomy is not always necessary | Bounded stages, narrow capabilities, read-only default |
| Tests need to reproduce the original defect | Preserve fail-to-pass and regression-test evidence |
| Static benchmarks and stale evidence mislead | Timestamp observations and re-fetch before current verdicts |
| Multi-agent work needs explicit task boundaries | Separate observer, researcher, reasoner, executor, verifier, recorder, reflector, governor |

## Documentation and standards to adopt

- [GitHub Actions workflow syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions) — explicit triggers, permissions, concurrency, and job boundaries.
- [GitHub REST API: Pull requests](https://docs.github.com/en/rest/pulls/pulls) — authoritative PR state and review metadata.
- [Gmail API: Push notifications](https://developers.google.com/gmail/api/guides/push) — Gmail mailbox change notifications; requires OAuth and Pub/Sub configuration.
- [SLSA specification](https://slsa.dev/spec/v1.1/) — provenance and supply-chain integrity model.
- [in-toto specification](https://in-toto.io/) — signed attestations and step-by-step supply-chain layouts.
- [JSON Schema 2020-12](https://json-schema.org/draft/2020-12) — versioned event contract validation.

## Limitations and evidence discipline

- Research results are task- and benchmark-specific; do not translate paper scores into expected TWGT performance.
- A DOI resolving proves bibliographic identity, not that every result is reproducible or applicable.
- Preprints can be valuable current evidence but must remain distinguished from peer-reviewed work.
- The archive's own workflow is a structural JSON/policy check; it does not yet prove live Gmail ingestion, durable queue semantics, database recovery, or GitHub review automation.
