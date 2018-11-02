// angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// libs
import { EMPTY, Observable, of as observableOf } from 'rxjs';
import { delay, map, retry } from 'rxjs/operators';
import { ConfigService } from '@ngx-config/core';

// framework
import { BaseEntityService, UniqueId } from '~/app/framework/ngrx';

// shared
import { HTTP_CLIENT__MAX_RETRIES } from '~/app/shared';

// module
import { Airline } from './airline.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineService extends BaseEntityService<Airline> {
  constructor(protected readonly config: ConfigService,
              protected readonly http: HttpClient) {
    super(config, http, ['backend', 'flight', 'airline']);
  }

    getAll$(): Observable<Array<Airline>> {
      const backend = this.config.getSettings(this.settingsKey);

      return this.http
        .get<Array<Airline>>(backend.endpoint)
        .pipe(
          delay(2000), // NOTE: simulate slow network
          retry(HTTP_CLIENT__MAX_RETRIES)
        );
    }

    get$(id: UniqueId): Observable<Airline> {
      const backend = this.config.getSettings(this.settingsKey);

      return this.http
        .get<Array<Airline>>(backend.endpoint)
        .pipe(
          delay(2000), // NOTE: simulate slow network
          retry(HTTP_CLIENT__MAX_RETRIES),
          map(cur => cur
            .find(item => item._id === id))
        );
    }

  createMany$(resources: Array<Airline>): Observable<Array<Airline>> {
    return EMPTY;
  }

  createOne$(resource: Airline): Observable<Airline> {
    // TODO: fake impl
    return observableOf({...resource, _id: '100000000000000000000001'})
      .pipe(delay(2000)); // NOTE: simulate slow network
  }

  updateMany$(resources: Array<Airline>): Observable<Array<Airline>> {
    return EMPTY;
  }

  updateOne$(resource: Airline): Observable<Airline> {
    // TODO: fake impl
    return observableOf(resource)
      .pipe(delay(2000)); // NOTE: simulate slow network
  }

  deleteMany$(ids: Array<UniqueId>): Observable<Array<UniqueId>> {
    return EMPTY;
  }

  deleteOne$(id: UniqueId): Observable<UniqueId> {
    // TODO: fake impl
    return observableOf(id)
      .pipe(delay(2000)); // NOTE: simulate slow network
  }
}
