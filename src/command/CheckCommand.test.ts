import path from 'path';
import { CheckCommand } from './CheckCommand';

describe('CheckCommand', () => {
  describe('with class', () => {
    it('when valid ruby code, return 0', async () => {
      const actual = await CheckCommand.execute(['class'], [path.join('fixtures', 'ruby', 'valid')]);
      expect(actual).toEqual(0);
    });
    it('when invalid ruby code, return 1', async () => {
      const actual = await CheckCommand.execute(['class'], [path.join('fixtures', 'ruby', 'invalid')]);
      expect(actual).toEqual(1);
    });
  });

  describe('with method', () => {
    it('when valid ruby code, return 0', async () => {
      const actual = await CheckCommand.execute(['method'], [path.join('fixtures', 'ruby', 'valid')]);
      expect(actual).toEqual(0);
    });
    it('when invalid ruby code, return 1', async () => {
      const actual = await CheckCommand.execute(['method'], [path.join('fixtures', 'ruby', 'invalid')]);
      expect(actual).toEqual(1);
    });
  });
});
