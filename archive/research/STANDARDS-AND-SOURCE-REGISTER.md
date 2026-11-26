# Standards and authoritative source register

Research snapshot: 2026-11-19. This register distinguishes technical standards, legal sources, voluntary guidance and platform-specific documentation. It is not a certification or legal opinion.

## Metadata and provenance

- **W3C PROV-O:** interoperable provenance representation for entities, activities and agents. https://www.w3.org/TR/prov-o/
- **Internet Archive item metadata:** source-specific fields and identifier behavior. https://internetarchive.readthedocs.io/en/stable/metadata.html
- **Internet Archive Metadata API:** public read endpoint and item metadata response. https://doc-tools.readthedocs.io/en/ia-test-gsod/md-read.html
- **Internet Archive Metadata API write:** authenticated item metadata modifications; use only after explicit approval. https://doc-tools.readthedocs.io/en/ia-test-gsod/md-write.html
- **Internet Archive Tasks API:** uploads and metadata/file operations are queued as tasks and have task history/logs. https://doc-tools.readthedocs.io/en/ia-test-gsod/tasks.html

## Digital preservation and integrity

- **PREMIS 3.0:** preservation metadata data model for Objects, Events, Rights and Agents. https://www.loc.gov/standards/premis/v3/
- **RFC 8493 BagIt:** package layout with payload and metadata tags for reliable transfer. https://www.rfc-editor.org/rfc/rfc8493.html
- **Internet Archive metadata conventions:** identifiers, title, creator, date, collection, mediatype, licenseurl, rights, subject and platform-managed fields. https://internetarchive.readthedocs.io/en/stable/metadata.html

## Secure engineering and governance

- **NIST SP 800-218 SSDF v1.1:** secure software development practices integrated into the SDLC. https://csrc.nist.gov/pubs/sp/800/218/final
- **New Zealand Privacy Act 2020:** assess scope and information privacy principles, including collection, use, disclosure and overseas handling. https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23226.html
- **New Zealand Public Records Act 2005:** applicability depends on statutory scope and role. https://www.legislation.govt.nz/act/public/2005/40/en/latest/
- **New Zealand Copyright Act 1994:** rights and permitted use must be assessed before copying or publishing. https://www.legislation.govt.nz/act/public/1994/143/en/latest/
- **EU GDPR:** assess territorial/material scope before treating as applicable. https://eur-lex.europa.eu/eli/reg/2016/679/
- **EU AI Act 2024/1689 and amendments:** assess provider/deployer role, system category, territorial scope and current consolidated text. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27

## Internet Archive integration boundary

Internet Archive exposes public metadata reads and authenticated write/task surfaces. A TWGT connector should:
1. start with public read-only metadata retrieval;
2. preserve the exact source URI, identifier, response timestamp and digest;
3. map IA metadata into TWGT fields while retaining source-native values;
4. distinguish IA platform-managed fields from locally observed timestamps;
5. require rights/privacy review before upload or metadata modification;
6. record task IDs, task status and logs after any separately authorized write;
7. verify the resulting item independently.

Do not interpret availability of a public API as permission to ingest, republish or preserve every item. Respect source rights, licenses, access restrictions and applicable law.
