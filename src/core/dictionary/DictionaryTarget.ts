export class DictionaryTarget {
  constructor(
    public targetName: string | undefined,
    public targetType: 'class' | 'method' | 'unknown',
    public targetLine: number,
    public targetFilePath: string,
  ) {}
}
