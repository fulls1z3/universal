import { t } from '~/app/framework/testing';

import { getError, getIsProcessing, getSelected, getSelectedId } from './airline.selectors';
import { AIRLINE } from './airline.state';
import { MOCK_AIRLINE } from './testing';

const MOCK_STORE = {
  [AIRLINE]: {
    ids: [MOCK_AIRLINE._id],
    entities: { [MOCK_AIRLINE._id]: MOCK_AIRLINE },
    selectedId: MOCK_AIRLINE._id
  }
};

t.describe('airline: getIsProcessing', () => {
  t.it('should return `isProcessing` on the state', () => {
    const actual = getIsProcessing(MOCK_STORE);

    t.e(actual).toBeFalsy();
  });
});

t.describe('airline: getError', () => {
  t.it('should return `error` on the state', () => {
    const actual = getError(MOCK_STORE);

    t.e(actual).toBeUndefined();
  });
});

t.describe('airline: getSelectedId', () => {
  t.it('should return `selectedId` on the state', () => {
    const actual = getSelectedId(MOCK_STORE);

    t.e(actual).toEqual(MOCK_AIRLINE._id);
  });
});

t.describe('airline: getSelected', () => {
  t.it('should return `selected` on the state', () => {
    const actual = getSelected(MOCK_STORE);

    t.e(actual).toEqual(MOCK_AIRLINE);
  });
});
