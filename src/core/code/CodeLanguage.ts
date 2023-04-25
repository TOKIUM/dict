export type CodeLanguage = 'Ruby'

export const CodeLanguage = {
  from(filepath: string): CodeLanguage {
    const extension = filepath.split('.').pop();

    switch (extension) {
      case 'rb':
        return 'Ruby';
      default:
        throw new Error(`Unknown extension: ${extension}`);
    }
  }
}
