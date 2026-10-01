// repl.js refers to repl.ts, but without a bundler we need to refer to the actual output file
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const state = initState();
  startREPL(state);
}

main();
