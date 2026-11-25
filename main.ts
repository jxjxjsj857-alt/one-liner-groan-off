// The One-Liner Groan-Off entry for make.fun.
// Writes one original dad joke to /output/entry.txt.
// Node 22, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "My computer beat me at chess, so I unplugged it mid-game. I call that a power move.";

// The gate only accepts UTF-8 text of 1 to 140 characters, not only
// whitespace. Fail loudly instead of writing an entry that cannot win.
if (JOKE.trim().length === 0 || JOKE.length > 140) {
  throw new Error(`Joke must be 1-140 characters, got ${JOKE.length}.`);
}
if (JOKE.includes("\n")) {
  throw new Error("Joke must be a single line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");

// Read back and confirm the file holds exactly the joke, so a partial
// or failed write cannot pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== JOKE) {
  throw new Error("Wrote /output/entry.txt but its content differs.");
}
console.log(`Wrote ${JOKE.length}-character dad joke to /output/entry.txt`);
