export type Format = 'Markdown' | 'Notion' | 'Yaml';

export const Format = {

  from(type: string): Format {
    switch (type) {
      case 'markdown':
        return 'Markdown';
      case 'notion':
        return 'Notion';
      case 'yaml':
        return 'Yaml';
      default:
        throw new Error(`Unknown format: ${type}`);
    }
  }
}
