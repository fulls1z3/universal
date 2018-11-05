// libs
import { Observable, of as observableOf, throwError } from 'rxjs';

// framework
import { UniqueId } from '~/app/framework/ngrx';

// shared
import { ERR__NO_PAYLOAD } from '~/app/shared';

// module
import { Airline } from '../../airline.model';
import { MOCK_AIRLINE, MOCK_AIRLINES } from '../common';

export class MockAirlineService {
  isFailing: boolean;

  constructor() {
    this.isFailing = false;
  }

  getMany$(): Observable<Array<Airline>> {
    return !this.isFailing
      ? observableOf(MOCK_AIRLINES)
      : throwError(ERR__NO_PAYLOAD);
  }

  getOne$(id: UniqueId): Observable<Airline> {
    return !this.isFailing
      ? observableOf({
        ...MOCK_AIRLINE,
        _id: id
      })
      : throwError(ERR__NO_PAYLOAD);
  }

  createOne$(resource: Airline): Observable<Airline> {
    return !this.isFailing
      ? observableOf(resource)
      : throwError(ERR__NO_PAYLOAD);
  }

  updateOne$(resource: Airline): Observable<Airline> {
    return !this.isFailing
      ? observableOf(resource)
      : throwError(ERR__NO_PAYLOAD);
  }

  deleteOne$(id: UniqueId): Observable<UniqueId> {
    return !this.isFailing
      ? observableOf(id)
      : throwError(ERR__NO_PAYLOAD);
  }
}
