import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const catalogUrl = new URL("../catalog.json", import.meta.url);
const digestUrl = new URL("../catalog.sha256", import.meta.url);
const bytes = await readFile(catalogUrl);
const digest = createHash("sha256").update(bytes).digest("hex");
await writeFile(digestUrl, `${digest}  catalog.json\n`, "utf8");
process.stdout.write(`${digest}\n`);
