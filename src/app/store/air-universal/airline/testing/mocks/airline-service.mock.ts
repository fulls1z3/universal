import { Observable, of as observableOf, throwError } from 'rxjs';
import { UniqueId } from '~/app/framework/ngrx';
import { ERROR__NO_PAYLOAD } from '~/app/shared';

import { Airline } from '../../airline.model';
import { MOCK_AIRLINE, MOCK_AIRLINES } from '../common';

export class MockAirlineService {
  isFailing: boolean;

  constructor() {
    this.isFailing = false;
  }

  getMany$(): Observable<Array<Airline>> {
    return !this.isFailing ? observableOf(MOCK_AIRLINES) : throwError(ERROR__NO_PAYLOAD);
  }

  getOne$(id: UniqueId): Observable<Airline> {
    return !this.isFailing
      ? observableOf({
          ...MOCK_AIRLINE,
          _id: id
        })
      : throwError(ERROR__NO_PAYLOAD);
  }

  createOne$(resource: Airline): Observable<Airline> {
    return !this.isFailing ? observableOf(resource) : throwError(ERROR__NO_PAYLOAD);
  }

  updateOne$(resource: Airline): Observable<Airline> {
    return !this.isFailing ? observableOf(resource) : throwError(ERROR__NO_PAYLOAD);
  }

  deleteOne$(id: UniqueId): Observable<UniqueId> {
    return !this.isFailing ? observableOf(id) : throwError(ERROR__NO_PAYLOAD);
  }
}
