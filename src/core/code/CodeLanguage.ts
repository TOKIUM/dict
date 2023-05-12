export type CodeLanguage = 'Ruby' | 'Typescript' | 'Unknown';

export const CodeLanguage = {
  from(filepath: string): CodeLanguage {
    const extension = filepath.split('.').pop();

    switch (extension) {
      case 'rb':
        return 'Ruby';
      case 'ts':
        return 'Typescript';
      default:
        return 'Unknown';
    }
  }
}
