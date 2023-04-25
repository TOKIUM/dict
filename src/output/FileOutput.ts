import { Dictionary } from '../core/dictionary/Dictionary';
import { Output } from './Output';
import { TextFormat } from './TextFormat';
import fs from 'fs';

export class FileOutput implements Output {
  constructor(
    public readonly format: TextFormat,
    public readonly filePath: string,
  ) {}

  exec(dictionaries: Dictionary[]): Promise<void> {
    const formatted = this.format.formatAll(dictionaries);

    try {
      fs.writeFileSync(this.filePath, formatted);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}