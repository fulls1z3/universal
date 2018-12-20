import { head } from 'lodash/fp';
import { initialAirline } from '~/app/store';

export const MOCK_AIRLINES = [
  {
    ...initialAirline,
    _id: '100000000000000000000001'
  },
  {
    ...initialAirline,
    _id: '100000000000000000000002'
  }
];

export const MOCK_AIRLINE = head(MOCK_AIRLINES);
