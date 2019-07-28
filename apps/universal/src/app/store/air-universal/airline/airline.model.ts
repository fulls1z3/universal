import { EMPTY_UNIQUE_ID } from '../../../framework/ngrx';
import { Airline } from '../../../library/flight/models/airline.js';

export { Airline };

export const initialAirline: Airline = {
  _id: EMPTY_UNIQUE_ID,
  iataCode: '',
  name: ''
};
