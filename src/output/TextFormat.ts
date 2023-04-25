import { Dictionary } from '../core/dictionary/Dictionary';
import { MarkdownFormat } from './textFormat/MarkdownFormat';
import { YamlFormat } from './textFormat/YamlFormat';

export interface TextFormat {
  format(dictionary: Dictionary): string;
  formatAll(dictionaries: Dictionary[]): string;
} 

export const TextFormat = {
  from: (format: string): TextFormat => {
    switch (format) {
      case 'markdown':
        return new MarkdownFormat();
      case 'yaml':
        return new YamlFormat();
      default:
        throw new Error(`Unknown format: ${format}`);
    }
  }
}
