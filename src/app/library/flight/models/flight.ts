import { BaseDocument } from '~/app/framework/ngrx';

import { Airport } from './airport';
import { FlightSegment } from './flight-segment';

export interface Flight extends BaseDocument {
  departure: Airport;
  arrival: Airport;
  segments: Array<FlightSegment>;
}
