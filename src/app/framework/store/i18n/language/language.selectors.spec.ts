// testing
import { t } from '~/app/framework/testing';
import { MOCK_LANGUAGE } from './testing';

// app
import { initialLanguage } from '~/app/framework/i18n';

// module
import { getError, getIsProcessing, getWorkingLanguage } from './language.selectors';
import { LANGUAGE } from './language.state';

const MOCK_STORE = {
  [LANGUAGE]: {
    selectedItem: initialLanguage
  }
};

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('store', () => {
      t.describe('i18n', () => {
        t.describe('language: getIsProcessing', () => {
          t.it('should return `isProcessing` on the state', () => {
            const actual = getIsProcessing(MOCK_STORE);

            t.e(actual)
              .toBeFalsy();
          });
        });

        t.describe('airline: getError', () => {
          t.it('should return `error` on the state', () => {
            const actual = getError(MOCK_STORE);

            t.e(actual)
              .toBeUndefined();
          });
        });

        t.describe('airline: getWorkingLanguage', () => {
          t.it('should return `selectedItem` on the state', () => {
            const actual = getWorkingLanguage(MOCK_STORE);

            t.e(actual)
              .toEqual(MOCK_LANGUAGE);
          });
        });
      });
    });
  });
});
