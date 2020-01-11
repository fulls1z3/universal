import { getError, getIsProcessing } from './auth.selectors';
import { AUTH } from './auth.state';

const MOCK_STORE = {
  [AUTH]: {}
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
