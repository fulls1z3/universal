import { BaseDocument } from '~/app/framework/ngrx';

export interface Airline extends BaseDocument {
  iataCode: string;
  name: string;
}
