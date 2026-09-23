import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { assertVegaPluginCatalog } from "@haneoka/vega-protocol";

const catalogUrl = new URL("../catalog.json", import.meta.url);
const digestUrl = new URL("../catalog.sha256", import.meta.url);
const bytes = await readFile(catalogUrl);
const catalog = JSON.parse(bytes.toString("utf8"));
assertVegaPluginCatalog(catalog);

const identities = catalog.plugins.map(({ id, version }) => `${id}@${version}`);
const sorted = [...identities].sort((left, right) => left.localeCompare(right));
if (JSON.stringify(identities) !== JSON.stringify(sorted)) {
  throw new Error("catalog plugins must be sorted by id and version");
}

for (const entry of catalog.plugins) {
  if (entry.source.type !== "registry") {
    throw new Error(`${entry.id}@${entry.version} is not a registry release`);
  }
  for (const runtime of entry.externalRuntimes ?? []) {
    const serialized = JSON.stringify(runtime);
    if (/"(?:path|url|artifact|receipt|integrity)"\s*:/u.test(serialized)) {
      throw new Error(`${entry.id}@${entry.version} external runtime metadata contains an artifact`);
    }
  }
}

const actual = createHash("sha256").update(bytes).digest("hex");
const expected = (await readFile(digestUrl, "utf8")).trim().split(/\s+/u)[0];
if (actual !== expected) {
  throw new Error(`catalog.sha256 is stale: expected ${expected ?? "<missing>"}, got ${actual}`);
}

process.stdout.write(`Verified ${catalog.plugins.length} marketplace entries (${actual})\n`);
