// angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// libs
import { Observable, of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ConfigService } from '@ngx-config/core';

// framework
import { BaseEntityService, UniqueId } from '~/app/framework/ngrx';

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

  createMany$(resources: Array<Airline>): Observable<Airline> {
    return undefined;
  }

  createOne$(resource: Airline): Observable<Airline> {
    // TODO: fake impl
    return observableOf({...resource, _id: '100000000000000000000001'})
      .pipe(delay(2000)); // NOTE: simulate slow network
  }

  updateMany$(resources: Array<Airline>): Observable<Airline> {
    return undefined;
  }

  updateOne$(resource: Airline): Observable<Airline> {
    // TODO: fake impl
    return observableOf(resource)
      .pipe(delay(2000)); // NOTE: simulate slow network
  }

  deleteMany$(ids: Array<UniqueId>): Observable<UniqueId> {
    return undefined;
  }

  deleteOne$(id: UniqueId): Observable<UniqueId> {
    // TODO: fake impl
    return observableOf(id)
      .pipe(delay(2000)); // NOTE: simulate slow network
  }
}
