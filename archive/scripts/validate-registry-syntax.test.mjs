import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

test("archive registry validator parses as an ES module", () => {
  const validator = fileURLToPath(new URL("./validate-registry.mjs", import.meta.url));
  const result = spawnSync(process.execPath, ["--check", validator], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr || result.stdout || "node --check failed");
});
