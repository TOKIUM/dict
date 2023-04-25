import path from 'path';
import { GenerateCommand } from './GenerateCommand';

describe('GenerateCommand', () => {
  it('when valid ruby code, return 0', async () => {
    const actual = await GenerateCommand.execute('markdown', [path.join('fixtures', 'ruby', 'valid')], undefined);
    expect(actual).toEqual(0);
  });

  it('when invalid ruby code, return 1', async () => {
    const actual = await GenerateCommand.execute('markdown', [path.join('fixtures', 'ruby', 'invalid')], undefined);
    expect(actual).toEqual(1);
  });
});
