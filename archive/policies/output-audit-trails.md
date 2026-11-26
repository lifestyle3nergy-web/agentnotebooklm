# Output audit trails and compliance controls

## Scope

Applies to catalog exports, research answers, generated summaries, classifications, embeddings, model outputs, migration reports, preservation packages, dashboards and any proposed repository or external-service action.

## Audit record

Use `schemas/audit-event.schema.json`. Record actor, event time, input asset IDs and versions, action/tool/model versions, configuration and prompt-template digests, transformations, evidence references, output digest, policy version, authorization state, reviewer and retention class.

Avoid retaining raw prompts or output content when they contain secrets, private personal information or third-party copyrighted material. A digest and protected reference may be sufficient.

## Claim and citation discipline

Every material factual statement in a research output must map to one or more source references. Record source version and retrieval time. Separate FACT, CLAIM, INFERENCE, HYPOTHESIS, FORECAST, ADVOCACY and UNKNOWN. A DOI or URL resolving establishes an identifier/endpoint, not the truth of every claim in a paper.

## Audit controls

- Append-only audit events; corrections supersede rather than erase.
- Hash manifests for snapshots and exported evidence bundles.
- Role-based access and access logging.
- Separate read and write credentials.
- Human approval for publication, deletion, archive.org upload/metadata update and repository mutation.
- Reconcile source and archive state after every authorized write.
- Preserve failure, denial and rollback evidence.
- Periodically test export, restore and audit completeness.

## Output release gate

A result may be published only when its classification permits the destination, rights are established, sources are cited, quality limitations are disclosed, output digest is captured, and required human review is recorded. Otherwise emit `HELD` with an actionable reason.

## Audit findings

Finding states: `OPEN`, `IN_PROGRESS`, `MITIGATED`, `ACCEPTED_RISK`, `CLOSED_VERIFIED`. A finding is not closed merely because a code change was made; evidence must show the control works.
