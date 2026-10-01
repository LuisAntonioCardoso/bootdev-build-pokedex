import { type State } from "./state.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args:string[]) => Promise<void>;
};

export async function executeCommand(state:State, args:string[]) {
  if(args.length<1)
    return;

  const commandName = args[0];
  if(!commandName)
    return;
  if(!Object.hasOwn(state.commandList,commandName)) {
    console.log(`the command '${args[0]}' is not valid`);
    return;
  }
  
  const command = state.commandList[commandName];
  try {
    await command.callback(state, ...args.slice(1));
  } catch (error) {
    console.log((error as Error).message);
  }
}

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: 'help',
      description: 'Displays a help message',
      callback: commandHelp,
    },
    exit: {
      name: 'exit',
      description: 'Exit the Pokedex',
      callback: commandExit,
    },
    map: {
      name: 'map',
      description: 'Get the next page of locations',
      callback: commandMapForward,
    },
    mapb: {
      name: 'mapb',
      description: 'Get the previous page of locations',
      callback: commandMapBackward,
    },
    explore: {
      name: 'explore',
      description: 'Get data about specified area',
      callback: commandExplore,
    },
    catch: {
      name: 'catch',
      description: 'Try to catch specified pokemon',
      callback: commandCatch,
    },
    inspect: {
      name: 'inspect',
      description: 'Get data of specified pokemon',
      callback: commandInspect,
    },
    pokedex: {
      name: 'pokedex',
      description: 'Get list of caught pokemon',
      callback: commandPokedex,
    },
  }
}

async function commandHelp(state: State) {
  console.log('Welcome to the Pokedex!');
  console.log('Usage:');
  console.log('');
  for(const command of Object.values(state.commandList))
    console.log(`${command.name}: ${command.description}`);
}

async function commandExit(state: State) {
  console.log('Closing the Pokedex... Goodbye!');
  state.io.close();
  process.exit();
}

async function commandMapForward(state:State) {
  const {next, previous, results} = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

  state.nextLocationsURL=next;
  state.prevLocationsURL=previous??'';
  for (const location of results) {
    console.log(location.name);
  }
}

async function commandMapBackward(state:State) {
  if(!state.prevLocationsURL)
    throw new Error("you're on the first page");

  const {next, previous, results} = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

  state.nextLocationsURL=next;
  state.prevLocationsURL=previous??'';
  for (const location of results) {
    console.log(location.name);
  }
}

async function commandExplore(state: State, ...args: string[]) {
  if(args.length!==1 && !args[0])
    throw new Error('Usage: explore <area_name>');

  const { name, pokemon_encounters } = await state.pokeAPI.fetchLocation(args[0]);

  console.log(`Exploring ${name}...`); 
  console.log(`Found Pokemon:`); 

  for(const encounter of pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}

async function commandCatch(state: State, ...args: string[]) {
  if(args.length!==1 && !args[0])
    throw new Error('Usage: catch <pokemon_name>');

  const pokemon = await state.pokeAPI.fetchPokemon(args[0]);

  console.log(`Throwing a Pokeball at ${pokemon.name}...`); 

  const maxExp = 635;
  if(Math.random()*(maxExp+65) >= pokemon.base_experience){
    console.log(`${pokemon.name} was caught!`); 
    if(!state.pokedex.has(pokemon.name))
      console.log('You may now inspect it with the inspect command.');
    state.pokedex.set(pokemon.name, pokemon) 
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}

async function commandInspect(state: State, ...args: string[]) {
  if(args.length!==1 && !args[0])
    throw new Error('Usage: inspect <pokemon_name>');

  const pokemon = state.pokedex.get(args[0]);
  
  if(!pokemon){
    console.log('you have not caught that pokemon');
    return;
  }
  const {name, height, weight, stats, types} = pokemon;
  console.log(`Name: ${name}`);
  console.log(`Height: ${height}`);
  console.log(`Weight: ${weight}`);
  console.log(`Stats:`);
  for(const entry of stats)
    console.log(` -${entry.stat.name}: ${entry.base_stat}`);
  console.log(`Types:`);
  for(const entry of types)
    console.log(` - ${entry.type.name}`);
}

async function commandPokedex(state: State) {
  console.log('Your Pokedex:');
  for(const name of state.pokedex.keys())
    console.log(` -${name}`);
}
