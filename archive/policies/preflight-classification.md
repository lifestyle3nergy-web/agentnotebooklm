# Preflight classification checks

## Purpose

Prevent unauthorized, unsafe or misleading metadata from entering catalog, vector, graph, research or public preservation workflows.

## Required gates

| Gate | Questions | Hold condition |
|---|---|---|
| Identity | Is source and source-native identity known? | Unknown or conflicting source |
| Authority | Is access authorized for this connector and purpose? | No documented access basis |
| Data sensitivity | Does content contain personal, confidential, credential, security or regulated data? | Unclassified or restricted data without approved route |
| Rights | Is metadata/content use, copying, embedding, retention and publication permitted? | Rights unknown where copying/indexing is proposed |
| Purpose | Is the ingestion purpose documented and proportionate? | Purpose absent or incompatible |
| Jurisdiction | Where are source, subjects, processors and storage located? | Material transfer risk unassessed |
| Integrity | Is format, size, schema, malware and digest check defined? | Failed or unsupported input |
| Lineage | Can source, collector, transform and time be reconstructed? | Missing provenance |
| Retention | Is retention/deletion/hold behavior defined? | No policy for non-public or personal data |
| AI processing | Will an external model receive this content? | No approved data-sharing and retention basis |

## Classification outcomes

- `PUBLIC`: explicitly approved for public disclosure and rights-cleared.
- `INTERNAL`: non-public operational metadata, limited to authorized project members.
- `CONFIDENTIAL`: commercially, operationally or personally sensitive; restricted access.
- `RESTRICTED`: credentials, high-risk personal data, security details, legal hold or regulated content; segregated store and no vector/public index by default.
- `UNKNOWN`: default for unassessed data; quarantine and no downstream enrichment.

Security classification, rights status, evidence class and lifecycle state are separate dimensions.

## Decision logic

1. Start with `UNKNOWN`.
2. Evaluate source authority, purpose, privacy, rights, security and retention.
3. Assign the most restrictive plausible class while uncertainty remains.
4. Route restricted/high-impact cases to a human steward.
5. Record policy version, checks, evidence, decision actor and timestamp.
6. Only allow catalog and enrichment operations that are permitted for the resulting class.

A classification label does not itself grant access. Access is enforced by the source ACL and archive policy at every query and retrieval boundary.
