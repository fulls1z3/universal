import { BaseDocument } from '@fulls1z3/shared/util-store';

import { Airport } from '../airport/airport.model';

import { FlightSegment } from './flight-segment.model';

export interface Flight extends BaseDocument {
  departure: Airport;
  arrival: Airport;
  segments: Array<FlightSegment>;
}
