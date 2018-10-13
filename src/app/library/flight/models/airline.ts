// shared
import { BaseDocument } from '~/app/shared/common/models/base-document';

export interface Airline extends BaseDocument {
  iataCode: string;
  name: string;
}
