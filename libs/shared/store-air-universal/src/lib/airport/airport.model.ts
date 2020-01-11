import { BaseDocument } from '@fulls1z3/shared/util-store';

export interface Airport extends BaseDocument {
  iataCode: string;
  name: string;
}
