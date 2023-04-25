import { Dictionary } from '../core/dictionary/Dictionary';
import { NotionOutput } from './NotionOutput';
import { StdOutput } from './StdOutput';
import { TextFormat } from './TextFormat';
import { FileOutput } from './FileOutput';

export interface Output {
  exec(dictionaries: Dictionary[]): Promise<void>;
}

export const Output = {
  from(format: string, outputFilePath: string | undefined): Output {
    if (format === 'notion') return new NotionOutput();

    const textFormat = TextFormat.from(format);

    return outputFilePath ? new FileOutput(textFormat, outputFilePath) : new StdOutput(textFormat);
  }
}
