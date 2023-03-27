#!/usr/bin/env node

import { Check } from './cli/Check';
import { Generate } from './cli/Generate';

interface CommandArguments {
  command: 'check' | 'generate'
  filePaths: string[];
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

    const filePaths = argv.slice(1);
    
    return { command, filePaths };
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
    if (commandArgs.command === 'check') await Check.execute(commandArgs.filePaths);
    if (commandArgs.command === 'generate') await Generate.execute(commandArgs.filePaths);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
