type CLICommand = {
  name: string;
  description: string;
  callback: (args: string[]) => void;
};

export function executeCommand(args:string[]) {
  if(args.length<1)
    return;
  const commandName = args[0];
  if(!commandName)
    return;
  const commandList = getCommands();
  if(!Object.hasOwn(commandList,commandName))
    return;
  const command = commandList[commandName];
  command.callback(args.slice(1));
}

function getCommands(): Record<string, CLICommand> {
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
  }
}

function commandExit() {
  console.log('Closing the Pokedex... Goodbye!');
  process.exit();
}

function commandHelp() {
  const commandList = getCommands();
  console.log('Welcome to the Pokedex!');
  console.log('Usage:');
  console.log('');
  for(const command of Object.values(commandList))
    console.log(`${command.name}: ${command.description}`);
}
