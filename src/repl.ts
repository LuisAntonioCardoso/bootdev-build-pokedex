import { createInterface } from "node:readline/promises";
import { executeCommand } from "./commands.js";

export function cleanInput(input:string): string[]{
  return input.toLowerCase().split(" ").filter(item=>item.length!==0);
}

export function startREPL(){
  const io = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  
  io.prompt();

  io.on("line", (input:string)=>{
    const parsed = cleanInput(input);    
    if(parsed.length>0)
      executeCommand(parsed);
    io.prompt();
  });

}
