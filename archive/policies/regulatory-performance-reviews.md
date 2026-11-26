# Regulatory performance reviews

## Objective

Maintain an applicability-aware catalogue of legislation, regulations, standards, contractual controls and voluntary guidance. Track whether the archive's processing activities have been assessed and whether mapped controls are supported by evidence.

## Required record

Each obligation record must include: stable ID, official source URL, issuing authority, jurisdiction, document/version/effective dates, last checked date, applicability state, scope rationale, impacted asset classes/processes, responsible role, mapped controls, evidence references, gaps, next review date and legal-review reference.

## Applicability states

- `APPLICABLE`: scope reviewed and applicability confirmed by an authorized competent reviewer.
- `NOT_APPLICABLE_WITH_REASON`: scope reviewed and reason recorded.
- `POTENTIAL`: plausible scope; further assessment required.
- `UNASSESSED`: no determination yet.
- `REFERENCE`: technical or voluntary guidance, not a legal obligation by itself.

## Review triggers and cadence

- At source onboarding and before cross-border processing.
- At new data purpose, new model, new provider or public publication.
- At incident, complaint, rights request or material policy change.
- Quarterly for high-risk/rapidly changing obligations; 6–12 months for stable references, unless law or contract requires shorter review.
- Recheck source version and amendments before each formal assessment.

## Performance indicators

- applicability coverage = assessed in-scope records / records requiring assessment;
- control evidence coverage = controls with current evidence / mapped controls;
- overdue review rate;
- unresolved high-risk gap count and age;
- rights/retention exceptions;
- privacy/security incident response timeliness;
- policy-to-implementation drift.

Do not score legal compliance as a percentage unless the control universe, applicability, evidence standard and reviewer are defined. A green dashboard cannot replace legal advice or regulator interpretation.

## Initial catalogue

See `registry/regulatory-catalogue.json`. It includes New Zealand Privacy Act 2020, Public Records Act 2005 (conditional scope), Copyright Act 1994, GDPR (conditional territorial/material scope), EU AI Act as amended (conditional operator/system scope), NIST SSDF, W3C PROV-O, PREMIS and BagIt.

The New Zealand legislation entries are candidate scope references, not a conclusion that every Act applies to this private repository or its operator. Public Records Act scope in particular must be tested against statutory definitions and any relevant public-office/contract relationship. The EU AI Act catalogue entry must be checked against the current consolidated legal text and amendments.

## Escalation

A missed statutory deadline, suspected reportable breach, unlawful disclosure, rights complaint or prohibited processing is an incident and must be escalated to the designated human privacy/legal/security owner. Automated agents may flag and assemble evidence; they cannot make the final legal determination.
