import { BaseDocument } from '~/app/framework/ngrx';

import { Airline } from './airline';
import { Airport } from './airport';

export interface FlightSegment extends BaseDocument {
  iataCode: string;
  airline: Airline;
  carrier: Airline;
  departure: Airport;
  arrival: Airport;
}
