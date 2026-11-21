// gta6-meme-x-01 entry program — "WAITED" (v2).
//
// The X post is the entry. This program has one job only: deliver the
// post's address to the grader. It copies POST.json from the repository
// root into the output directory, byte for byte, then reads both files
// back and proves the copy is exact before it exits well.
// Node.js standard library only: no network, no clock, no randomness —
// the same input always produces the same output.
//
// Directory overrides, used for a local dry run:
//   MAKEFUN_BOT_DIR     repository root  (grader default: /bot)
//   MAKEFUN_OUTPUT_DIR  output directory (grader default: /output)
//
// Local dry run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function fail(message: string): never {
  console.error(`gta6-meme-x-01: ${message}`);
  process.exit(1);
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(botDir, "POST.json");
const targetPath = join(outputDir, "POST.json");

if (!existsSync(sourcePath)) {
  fail(`POST.json is missing at ${sourcePath}`);
}

// Read and validate first, so a malformed hand-in fails here, in our own
// run, instead of at the gate. The copy below still passes the file over
// exactly as it stands, untouched.
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(sourcePath, "utf8"));
} catch (err) {
  fail(`POST.json is not valid JSON: ${(err as Error).message}`);
}

const named =
  parsed !== null && typeof parsed === "object"
    ? (parsed as { url?: unknown }).url
    : undefined;

const POST_URL_SHAPE =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+\/?([?#].*)?$/;

if (typeof named !== "string" || !POST_URL_SHAPE.test(named)) {
  fail(`POST.json does not name an X post address (got ${JSON.stringify(named)})`);
}

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  fail(`could not copy POST.json to ${targetPath}: ${(err as Error).message}`);
}

// The hand-in counts only if the delivered file is the repository's
// POST.json byte for byte, so prove it before exiting well: read both
// files back and compare them exactly. A short or corrupted copy fails
// here rather than delivering the wrong address to the grader.
const sourceBytes = readFileSync(sourcePath);
const targetBytes = readFileSync(targetPath);

if (!sourceBytes.equals(targetBytes)) {
  fail(
    `copied POST.json differs from the original (${targetBytes.length} of ${sourceBytes.length} bytes match in length only)`,
  );
}
