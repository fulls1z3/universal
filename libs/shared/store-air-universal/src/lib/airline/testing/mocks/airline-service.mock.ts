import { ERROR__NO_PAYLOAD, UniqueId } from '@fulls1z3/shared/util-store';
import { of, throwError } from 'rxjs';

import { Airline } from '../../airline.model';
import { MOCK_AIRLINE, MOCK_AIRLINES } from '../common';

export class MockAirlineService {
  private _isFailing = false;

  set isFailing(value: boolean) {
    this._isFailing = value;
  }

  getMany$() {
    return !this._isFailing ? of(MOCK_AIRLINES) : throwError(ERROR__NO_PAYLOAD);
  }

  getOne$(id: UniqueId) {
    return !this._isFailing
      ? of({
          ...MOCK_AIRLINE,
          id
        })
      : throwError(ERROR__NO_PAYLOAD);
  }

  createOne$(resource: Airline) {
    return !this._isFailing ? of(resource) : throwError(ERROR__NO_PAYLOAD);
  }

  updateOne$(resource: Airline) {
    return !this._isFailing ? of(resource) : throwError(ERROR__NO_PAYLOAD);
  }

  deleteOne$(id: UniqueId) {
    return !this._isFailing ? of(id) : throwError(ERROR__NO_PAYLOAD);
  }
}
