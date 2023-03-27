export type Format = 'Markdown'

export const Format = {

  from(type: string): Format {
    switch (type) {
      case 'md':
        return 'Markdown';
      default:
        throw new Error(`Unknown format: ${type}`);
    }
  }
}
