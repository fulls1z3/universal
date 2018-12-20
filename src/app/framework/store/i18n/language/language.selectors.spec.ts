import { initialLanguage } from '~/app/framework/store';
import { t } from '~/app/framework/testing';

import { getError, getIsProcessing, getWorkingLanguage } from './language.selectors';
import { LANGUAGE } from './language.state';
import { MOCK_LANGUAGE } from './testing';

const MOCK_STORE = {
  [LANGUAGE]: {
    selectedItem: initialLanguage
  }
};

t.describe('getIsProcessing', () => {
  t.it('should return `isProcessing` on the state', () => {
    const actual = getIsProcessing(MOCK_STORE);

    t.e(actual).toBeFalsy();
  });
});

t.describe('getError', () => {
  t.it('should return `error` on the state', () => {
    const actual = getError(MOCK_STORE);

    t.e(actual).toBeUndefined();
  });
});

t.describe('getWorkingLanguage', () => {
  t.it('should return `selectedItem` on the state', () => {
    const actual = getWorkingLanguage(MOCK_STORE);

    t.e(actual).toEqual(MOCK_LANGUAGE);
  });
});
