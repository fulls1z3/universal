import { getError, getIsProcessing, getSelected, getSelectedId } from './airline.selectors';
import { AIRLINE } from './airline.state';
import { MOCK_AIRLINE } from './testing/common';

const MOCK_STORE = {
  [AIRLINE]: {
    ids: [MOCK_AIRLINE.id],
    entities: { [MOCK_AIRLINE.id]: MOCK_AIRLINE },
    selectedId: MOCK_AIRLINE.id
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

describe('getSelectedId', () => {
  test('should return `selectedId` on the state', () => {
    const actual = getSelectedId(MOCK_STORE);

    expect(actual).toEqual(MOCK_AIRLINE.id);
  });
});

describe('getSelected', () => {
  test('should return `selected` on the state', () => {
    const actual = getSelected(MOCK_STORE);

    expect(actual).toEqual(MOCK_AIRLINE);
  });
});
