// shared
import { BaseDocument } from '~/app/shared/common/models/base-document';

// module
import { Airline } from './airline';
import { Airport } from './airport';

export interface FlightSegment extends BaseDocument {
  iataCode: string;
  airline: Airline;
  carrier: Airline;
  departure: Airport;
  arrival: Airport;
}
