import { BaseDocument } from '@fulls1z3/shared/util-store';

import { Airline } from '../airline/airline.model';
import { Airport } from '../airport/airport.model';

export interface FlightSegment extends BaseDocument {
  iataCode: string;
  airline: Airline;
  carrier: Airline;
  departure: Airport;
  arrival: Airport;
}
