import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "A traffic jam is a river of cars that forgot how to flow, so everyone just floats there honking like ducks in a bathtub.\n" +
  "The river part fits the slow crawl, but rivers never honk, and ducks never have anywhere to be.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry, "utf8");

// Gate validation: two lines, 1-400 characters total, each line non-blank.
const chars = [...entry].length;
if (chars < 1 || chars > 400) {
  throw new Error(`entry is ${chars} characters, outside the 1-400 gate`);
}
const lines = entry.split("\n");
if (lines.length !== 2 || lines.some((l) => l.trim().length === 0)) {
  throw new Error("entry must be exactly two non-blank lines");
}

// Read-back verification: the written file must match the entry byte for byte.
const back = readFileSync(outPath, "utf8");
if (back !== entry) {
  throw new Error("read-back mismatch: entry.txt does not match the entry text");
}
