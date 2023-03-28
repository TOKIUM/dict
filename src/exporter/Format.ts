export type Format = 'Markdown' | 'Notion';

export const Format = {

  from(type: string): Format {
    switch (type) {
      case 'markdown':
        return 'Markdown';
      case 'notion':
        return 'Notion';
      default:
        throw new Error(`Unknown format: ${type}`);
    }
  }
}
