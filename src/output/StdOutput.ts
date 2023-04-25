import { Dictionary } from '../core/dictionary/Dictionary';
import { Output } from './Output';
import { TextFormat } from './TextFormat';

export class StdOutput implements Output {
  constructor(
    public readonly format: TextFormat,
  ) {}

  exec(dictionaries: Dictionary[]): Promise<void> {
    const formatted = this.format.formatAll(dictionaries);

    console.log(formatted);

    return Promise.resolve();
  }
}
