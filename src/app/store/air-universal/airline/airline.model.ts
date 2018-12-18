import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';
import { Airline } from '~/app/library/flight/models/airline.ts';

export { Airline };

export const initialAirline: Airline = {
  _id: EMPTY_UNIQUE_ID,
  iataCode: '',
  name: ''
};
