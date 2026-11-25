// One Star, Written in Sap: a one-line 1-star review from a houseplant
// about the human who owns it. The plant's grievance is a repotting
// into a pot with no drainage hole, and the turn lands on the hole
// being the whole job. Written for make.fun bounty
// u-steady-puffin-78-1922-one-star-written-in-sap-2ea1f4f4.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. He repotted me into a pot with no drainage hole, then Googled why I'm dying. The hole was the whole job.";

// Gate: entry.txt must be UTF-8 text of 1 to 279 characters, not only
// white space, and a single line.
if (LINE.length < 1 || LINE.length > 279) {
  throw new Error(`entry is ${LINE.length} characters, must be 1 to 279`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with white space");
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  throw new Error("entry must not contain control characters");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip read-back check: what was written must read back exactly.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("round-trip read-back mismatch");
}
if (back.length < 1 || back.length > 279) {
  throw new Error(`read-back is ${back.length} characters, must be 1 to 279`);
}
console.log(`wrote ${outPath} (${LINE.length} characters)`);
