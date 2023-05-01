import { Dictionary } from './Dictionary';
import { DictionaryAlias } from './DictionaryAlias';
import { DictionaryDescription } from './DictionaryDescription';
import { DictionaryFeature } from './DictionaryFeature';
import { DictionaryFeatureDescription } from './DictionaryFeatureDescription';
import { DictionaryFeatureName } from './DictionaryFeatureName';
import { DictionaryName } from './DictionaryName';
import { DictionaryTarget } from './DictionaryTarget';

describe('Dictionary', () => {
  describe('merge', () => {
    it('merge left and right dictionary', () => {
      const left = new Dictionary(
        new DictionaryName('User'),
        [new DictionaryAlias('user')],
        [new DictionaryDescription(new DictionaryTarget('User', 'class', 1, 'user.rb'), 'User left description')],
        [new DictionaryFeature(new DictionaryTarget('User', 'class', 1, 'user.rb'), new DictionaryFeatureName('User left feature'), [new DictionaryFeatureDescription('User left feature description')])],
      );

      const right = new Dictionary(
        new DictionaryName('User'),
        [new DictionaryAlias('system user')],
        [new DictionaryDescription(new DictionaryTarget('User', 'class', 1, 'user.rb'), 'User right description')],
        [
          new DictionaryFeature(new DictionaryTarget('User', 'class', 1, 'user.rb'), new DictionaryFeatureName('User left feature'), [new DictionaryFeatureDescription('User left feature description 2')]),
          new DictionaryFeature(new DictionaryTarget('User', 'class', 1, 'user.rb'), new DictionaryFeatureName('User right feature'), [new DictionaryFeatureDescription('User right feature description')])
        ],
      );

      const actual = left.merge(right);

      expect(actual).toEqual(new Dictionary(
        new DictionaryName('User'),
        [new DictionaryAlias('user'), new DictionaryAlias('system user')],
        [new DictionaryDescription(new DictionaryTarget('User', 'class', 1, 'user.rb'), 'User left description'), new DictionaryDescription(new DictionaryTarget('User', 'class', 1, 'user.rb'), 'User right description')],
        [
          new DictionaryFeature(new DictionaryTarget('User', 'class', 1, 'user.rb'), new DictionaryFeatureName('User left feature'), [new DictionaryFeatureDescription('User left feature description'), new DictionaryFeatureDescription('User left feature description 2')]),
          new DictionaryFeature(new DictionaryTarget('User', 'class', 1, 'user.rb'), new DictionaryFeatureName('User right feature'), [new DictionaryFeatureDescription('User right feature description')]),
        ],
      ));
    });
  });
});
