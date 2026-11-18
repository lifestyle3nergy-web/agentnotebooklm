import { readFile } from "node:fs/promises";

const registryPath = new URL("../registry/review-source-registry.json", import.meta.url);
const agentsPath = new URL("../registry/agent-capability-registry.json", import.meta.url);
const schemaPath = new URL("../schemas/archive-event.schema.json", import.meta.url);

const [registry, agents, schema] = await Promise.all(
  [registryPath, agentsPath, schemaPath].map(async (url) => JSON.parse(await readFile(url, "utf8")))
);

const errors = [];
const allowedEvidenceHosts = new Set(["github.com", "app.cochat.ai", "arxiv.org", "doi.org"]);
const statuses = new Set(["OBSERVED", "VERIFIED", "HELD", "UNKNOWN"]);
const ids = new Set();

if (registry.registry_version !== "1.0.0") errors.push("unsupported registry_version");
if (!Array.isArray(registry.repositories)) errors.push("repositories must be an array");

for (const [index, item] of (registry.repositories ?? []).entries()) {
  for (const key of ["repository", "category", "observed_at", "summary", "evidence_url", "evidence_class", "status", "next_action"]) {
    if (typeof item[key] !== "string" || item[key].length === 0) errors.push(`repositories[${index}].${key} is required`);
  }
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(item.repository ?? "")) errors.push(`repositories[${index}] has invalid repository identity`);
  if (!statuses.has(item.status)) errors.push(`repositories[${index}] has invalid status`);
  try {
    const url = new URL(item.evidence_url);
    if (url.protocol !== "https:" || !allowedEvidenceHosts.has(url.hostname)) errors.push(`repositories[${index}] has unapproved evidence URL host`);
  } catch {
    errors.push(`repositories[${index}] has invalid evidence URL`);
  }
  const key = `${item.repository}|${item.category}|${item.evidence_url}`;
  if (ids.has(key)) errors.push(`repositories[${index}] duplicates an existing evidence record`);
  ids.add(key);
  if (/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(item.summary ?? "")) errors.push(`repositories[${index}] appears to contain an email address`);
  if (/gmail\.com\/mail|thread-f:|msg-f:/i.test(item.summary ?? "")) errors.push(`repositories[${index}] appears to contain private Gmail identifiers`);
}

if (!Array.isArray(agents.agents) || agents.agents.length !== 8) errors.push("agent registry must contain exactly eight categories");
if (agents.default_mode !== "READ_ONLY") errors.push("default_mode must remain READ_ONLY");
if (schema.additionalProperties !== false) errors.push("archive event schema must reject additional properties");
if (!Array.isArray(agents.global_invariants) || !agents.global_invariants.includes("Human authorization required for every repository mutation or outbound email")) {
  errors.push("human authorization invariant missing");
}

if (errors.length) {
  console.error("Archive registry validation FAILED");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(JSON.stringify({
  result: "PASS",
  repository_records: registry.repositories.length,
  agent_categories: agents.agents.length,
  schema_version: schema.properties.schema_version.const,
  evidence_hosts: [...allowedEvidenceHosts]
}, null, 2));
