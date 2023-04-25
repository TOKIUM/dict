#!/usr/bin/env node

import { CheckCommand } from './command/CheckCommand';
import { GenerateCommand } from './command/GenerateCommand';

interface CommandArguments {
  command: 'check' | 'generate'
  args: string[];
}
class InvalidArgumentsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidArgumentsError';
  }
}

const CommandArguments = {
  from(argv: string[]): CommandArguments | InvalidArgumentsError {
    const command = argv[0];

    if (command !== 'check' && command !== 'generate') {
      return new InvalidArgumentsError('Invalid command. Use "check" or "generate".');
    }

    const args = argv.slice(1);
    
    return { command, args };
  }
};

(async () => {
  const args = process.argv.slice(2);
  const commandArgs = CommandArguments.from(args);

  if (commandArgs instanceof InvalidArgumentsError) {
    console.error(commandArgs.message);
    return process.exit(1);
  }

  try {
    if (commandArgs.command === 'check') await CheckCommand.execute(commandArgs.args);
    if (commandArgs.command === 'generate') await GenerateCommand.execute(commandArgs.args);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
