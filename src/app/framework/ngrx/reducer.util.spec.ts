import { t } from '~/app/framework/testing';

import { errorFn, startProcessingFn, stopProcessingFn } from './reducer.util';

type MOCK_TYPE = any;
const MOCK_ERROR_MESSAGE = 'Something went wrong.';

t.describe('startProcessingFn', () => {
  t.it('should set `isProcessing` to true', () => {
    const preState = {};

    const actual = startProcessingFn(preState);
    const expected: MOCK_TYPE = {
      ...preState,
      isProcessing: true,
      selectedItem: undefined
    };

    t.e(actual).toEqual(expected);
  });
});

t.describe('stopProcessingFn', () => {
  t.it('should set `isProcessing` to false', () => {
    const preState = {};

    const actual = stopProcessingFn(preState);
    const expected: MOCK_TYPE = {
      ...preState,
      isProcessing: false
    };

    t.e(actual).toEqual(expected);
  });
});

t.describe('errorFn', () => {
  t.it('should set the `error`', () => {
    const preState = {};

    const actual = errorFn(preState)(MOCK_ERROR_MESSAGE);
    const expected: MOCK_TYPE = {
      ...preState,
      isProcessing: false,
      selectedItem: undefined,
      error: MOCK_ERROR_MESSAGE
    };

    t.e(actual).toEqual(expected);
  });
});
