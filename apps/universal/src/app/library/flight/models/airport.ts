import { BaseDocument } from '../../../framework/ngrx';

export interface Airport extends BaseDocument {
  iataCode: string;
  name: string;
}
