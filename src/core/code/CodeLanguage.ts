export type CodeLanguage = 'Ruby' | 'Typescript'

export const CodeLanguage = {
  from(filepath: string): CodeLanguage {
    const extension = filepath.split('.').pop();

    switch (extension) {
      case 'rb':
        return 'Ruby';
      case 'ts':
        return 'Typescript';
      default:
        throw new Error(`Unknown extension: ${extension}`);
    }
  }
}
