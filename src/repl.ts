import { type State } from "./state.js";
import { executeCommand } from "./commands.js";

export function startREPL(state:State){
  state.io.prompt();

  state.io.on("line", async (input:string)=>{
    const args: string[] = cleanInput(input);    
    if(args.length>0)
      await executeCommand(state, args);
    state.io.prompt();
  });
}

export function cleanInput(input:string): string[]{
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(word=>word!=='');
}
