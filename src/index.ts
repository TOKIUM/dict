#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
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
  try {
    await yargs(hideBin(process.argv))
      .command(
        'check',
        'Check dictionary files.',
        (yargs) => {
          return yargs
            .array('input').alias('i', 'input').describe('input', 'Input directory path.').demandOption('input')
            .array('type').alias('t', 'type').describe('type', 'Target object type.').demandOption('type')
        },
        async (argv) => {
          const statusCode = await CheckCommand.execute(argv.input.map((v) => v.toString()), argv.type.map((v) => v.toString()));
          process.exit(statusCode);
        },
      )
      .command(
        'generate',
        'Generate dictionary files.',
        (yargs) => {
          return yargs
            .array('input').alias('i', 'input').describe('input', 'Input directory path.').demandOption('input')
            .string('format').alias('f', 'format').describe('format', 'Output format.').demandOption('format')
            .string('output').alias('o', 'output').describe('output', 'Output file path.')
        },
        async (argv) => {
          const statusCode = await GenerateCommand.execute(argv.format, argv.input.map((v) => v.toString()), argv.output);
          process.exit(statusCode);
        },
      ).parse();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
