// shared
import { BaseDocument } from '~/app/shared/common/models/base-document';

export interface Airport extends BaseDocument {
  iataCode: string;
  name: string;
}
