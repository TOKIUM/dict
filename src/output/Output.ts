import { Dictionary } from '../core/dictionary/Dictionary';
import { MarkdownOutput } from './MarkdownOutput';
import { NotionOutput } from './NotionOutput';
import { YamlOutput } from './YamlOutput';

export interface Output {
  exec(dictionaries: Dictionary[]): Promise<void>;
}

export const Output = {
  from(format: string): Output {
    switch (format) {
      case 'markdown':
        return new MarkdownOutput();
      case 'notion':
        return new NotionOutput();
      case 'yaml':
        return new YamlOutput();
      default:
        throw new Error(`Unknown format: ${format}`);
    }
  }
}
