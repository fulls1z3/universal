// shared
import { BaseDocument } from '~/app/shared/common/models/base-document';

// module
import { Airport } from './airport';
import { FlightSegment } from './flight-segment';

export interface Flight extends BaseDocument {
  departure: Airport;
  arrival: Airport;
  segments: Array<FlightSegment>;
}
