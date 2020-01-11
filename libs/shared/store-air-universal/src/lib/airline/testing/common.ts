import { initialAirline } from '../../../index';

export const MOCK_AIRLINES = [
  {
    ...initialAirline,
    id: '100000000000000000000001'
  },
  {
    ...initialAirline,
    id: '100000000000000000000002'
  }
];

export const MOCK_AIRLINE = MOCK_AIRLINES[0];
