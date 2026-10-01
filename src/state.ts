import { type Interface, createInterface } from "node:readline";
import { type CLICommand, getCommands } from "./commands.js";
import { type Pokemon, PokeAPI } from "./pokeapi.js";

export type State = {
  io: Interface;
  commandList: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  pokedex: Map<string,Pokemon>;
};

export function initState(): State {
  const state: State = {
    io: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
    }),
    commandList: getCommands(),
    pokeAPI: new PokeAPI(),
    nextLocationsURL: "",
    prevLocationsURL: "", 
    pokedex: new Map<string,Pokemon>(),
  }
  
  return state;
}
