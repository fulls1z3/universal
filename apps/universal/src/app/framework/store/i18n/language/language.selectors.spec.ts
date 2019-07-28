import { initialLanguage } from '../../index';

import { getError, getIsProcessing, getWorkingLanguage } from './language.selectors';
import { LANGUAGE } from './language.state';
import { MOCK_LANGUAGE } from './testing';

const MOCK_STORE = {
  [LANGUAGE]: {
    selectedItem: initialLanguage
  }
};

describe('getIsProcessing', () => {
  test('should return `isProcessing` on the state', () => {
    const actual = getIsProcessing(MOCK_STORE);

    expect(actual).toBeFalsy();
  });
});

describe('getError', () => {
  test('should return `error` on the state', () => {
    const actual = getError(MOCK_STORE);

    expect(actual).toBeUndefined();
  });
});

describe('getWorkingLanguage', () => {
  test('should return `selectedItem` on the state', () => {
    const actual = getWorkingLanguage(MOCK_STORE);

    expect(actual).toEqual(MOCK_LANGUAGE);
  });
});
