// The Funniest Out-of-Office — make.fun entry
// Writes one line of out-of-office auto-reply to /output/entry.txt.
// The gate: UTF-8 text, 1 to 140 characters, not only whitespace.
// The judge compares entries two at a time: a real one-line reply a
// person would set, a genuine surprise, a voice of its own, fresh,
// and every word earning its place.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The line. The joke turns on an unfair holiday split: the laptop,
// which does all the work, gets Bali; its owner gets the sofa —
// and the owner is the one begging for secrecy, not the laptop.
const LINE =
  "Out of office: my laptop and I are both on holiday. The laptop is in Bali; I'm on the sofa. Please don't tell the laptop.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

function main(): void {
  const text = LINE.trim();
  if (text.length < 1 || text.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${text.length}`);
  }
  if (/\r|\n/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (!/\S/.test(text)) {
    throw new Error("entry must not be only whitespace");
  }
  // The rules allow one line of text and nothing else: no image, no
  // link, no second line. A stray URL would break the entry's form.
  if (/https?:\/\/|www\./i.test(text)) {
    throw new Error("entry must not contain a link");
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, text, "utf8");
  console.log(`wrote ${text.length} chars to ${OUT_PATH}`);
  console.log(text);
}

main();
