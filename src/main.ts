// repl.js refers to repl.ts, but without a bundler we need to refer to the actual output file
import { startREPL } from "./repl.js";

function main() {
  startREPL();
}

main();
