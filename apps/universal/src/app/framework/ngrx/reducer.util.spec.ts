import { errorFn, startProcessingFn, stopProcessingFn } from './reducer.util';

type MOCK_TYPE = any;
const MOCK_ERROR_MESSAGE = 'Something went wrong.';

describe('startProcessingFn', () => {
  test('should set `isProcessing` to true', () => {
    const preState = {};

    const actual = startProcessingFn(preState);
    const expected: MOCK_TYPE = {
      ...preState,
      isProcessing: true,
      selectedItem: undefined
    };

    expect(actual).toEqual(expected);
  });
});

describe('stopProcessingFn', () => {
  test('should set `isProcessing` to false', () => {
    const preState = {};

    const actual = stopProcessingFn(preState);
    const expected: MOCK_TYPE = {
      ...preState,
      isProcessing: false
    };

    expect(actual).toEqual(expected);
  });
});

describe('errorFn', () => {
  test('should set the `error`', () => {
    const preState = {};

    const actual = errorFn(preState)(MOCK_ERROR_MESSAGE);
    const expected: MOCK_TYPE = {
      ...preState,
      isProcessing: false,
      selectedItem: undefined,
      error: MOCK_ERROR_MESSAGE
    };

    expect(actual).toEqual(expected);
  });
});
