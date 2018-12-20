import { BaseDocument } from '~/app/framework/ngrx';

export interface Airport extends BaseDocument {
  iataCode: string;
  name: string;
}
