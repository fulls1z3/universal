import { t } from '~/app/framework/testing';

import { entityErrorFn, entityResetFn, entityStartProcessingFn, entityStopProcessingFn } from './entity-reducer.util';

type MOCK_TYPE = any;
const MOCK_VALID_ID = '100000000000000000000001';
const MOCK_ERROR_MESSAGE = 'Something went wrong.';

t.describe('entityStartProcessingFn', () => {
  t.it('should set `isProcessing` to true', () => {
    const preState = {};

    const actual = entityStartProcessingFn(preState);
    const expected: MOCK_TYPE = {
      ...preState,
      ids: [],
      entities: {},
      isProcessing: true,
      selectedId: undefined
    };

    t.e(actual).toEqual(expected);
  });
});

t.describe('entityStopProcessingFn', () => {
  t.it('should set `isProcessing` to false', () => {
    const preState = {};

    const actual = entityStopProcessingFn(preState);
    const expected: MOCK_TYPE = {
      ...preState,
      isProcessing: false
    };

    t.e(actual).toEqual(expected);
  });
});

t.describe('entityErrorFn', () => {
  t.it('should set the `error`', () => {
    const preState = {};

    const actual = entityErrorFn(preState)(MOCK_ERROR_MESSAGE);
    const expected: MOCK_TYPE = {
      ...preState,
      ids: [],
      entities: {},
      isProcessing: false,
      selectedId: undefined,
      error: MOCK_ERROR_MESSAGE
    };

    t.e(actual).toEqual(expected);
  });
});

t.describe('entityResetFn', () => {
  t.it('should set revert the `selectedId` and set the `error`', () => {
    const preState = {};

    const actual = entityResetFn(preState)({
      id: MOCK_VALID_ID,
      error: MOCK_ERROR_MESSAGE
    });
    const expected: MOCK_TYPE = {
      ...preState,
      isProcessing: false,
      selectedId: MOCK_VALID_ID,
      error: MOCK_ERROR_MESSAGE
    };

    t.e(actual).toEqual(expected);
  });
});
