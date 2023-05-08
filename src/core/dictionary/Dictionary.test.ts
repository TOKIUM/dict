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
    const target = new DictionaryTarget('User', 'class', 1, 'user.rb');
    it('merge left and right dictionary', () => {
      const left = new Dictionary(
        new DictionaryName(target, 'User'),
        [new DictionaryAlias('user')],
        [new DictionaryDescription(target, 'User left description')],
        [new DictionaryFeature(target, new DictionaryFeatureName('User left feature'), [new DictionaryFeatureDescription('User left feature description')])],
      );

      const right = new Dictionary(
        new DictionaryName(target, 'User'),
        [new DictionaryAlias('system user')],
        [new DictionaryDescription(target, 'User right description')],
        [
          new DictionaryFeature(target, new DictionaryFeatureName('User left feature'), [new DictionaryFeatureDescription('User left feature description 2')]),
          new DictionaryFeature(target, new DictionaryFeatureName('User right feature'), [new DictionaryFeatureDescription('User right feature description')])
        ],
      );

      const actual = left.merge(right);

      expect(actual).toEqual(new Dictionary(
        new DictionaryName(target, 'User'),
        [new DictionaryAlias('user'), new DictionaryAlias('system user')],
        [new DictionaryDescription(target, 'User left description'), new DictionaryDescription(target, 'User right description')],
        [
          new DictionaryFeature(target, new DictionaryFeatureName('User left feature'), [new DictionaryFeatureDescription('User left feature description'), new DictionaryFeatureDescription('User left feature description 2')]),
          new DictionaryFeature(target, new DictionaryFeatureName('User right feature'), [new DictionaryFeatureDescription('User right feature description')]),
        ],
      ));
    });
  });
});
