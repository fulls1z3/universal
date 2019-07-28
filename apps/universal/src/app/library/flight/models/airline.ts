import { BaseDocument } from '../../../framework/ngrx';

export interface Airline extends BaseDocument {
  iataCode: string;
  name: string;
}
