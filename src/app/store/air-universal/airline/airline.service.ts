import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { EMPTY, Observable, of as observableOf } from 'rxjs';
import { delay, map, retry } from 'rxjs/operators';
import { BaseEntityService, HTTP_CLIENT__MAX_RETRIES, UniqueId } from '~/app/framework/ngrx';

import { Airline } from './airline.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineService extends BaseEntityService<Airline> {
  delay: number;

  constructor(protected readonly config: ConfigService, protected readonly http: HttpClient) {
    super(config, http, ['backend', 'flight', 'airline']);

    this.delay = 2000;
  }

  getMany$(): Observable<Array<Airline>> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.get<Array<Airline>>(backend.endpoint).pipe(
      delay(this.delay), // NOTE: simulate slow network
      retry(HTTP_CLIENT__MAX_RETRIES)
    );
  }

  getOne$(id: UniqueId): Observable<Airline> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.get<Array<Airline>>(backend.endpoint).pipe(
      delay(this.delay), // NOTE: simulate slow network
      retry(HTTP_CLIENT__MAX_RETRIES),
      map(cur => cur.find(item => item._id === id))
    );
  }

  createMany$(resources: Array<Airline>): Observable<Array<Airline>> {
    return EMPTY;
  }

  createOne$(resource: Airline): Observable<Airline> {
    // NOTE: fake impl
    return observableOf({
      ...resource,
      _id: '100000000000000000000001'
    }).pipe(delay(this.delay)); // NOTE: simulate slow network
  }

  updateMany$(resources: Array<Airline>): Observable<Array<Airline>> {
    return EMPTY;
  }

  updateOne$(resource: Airline): Observable<Airline> {
    // NOTE: fake impl
    return observableOf(resource).pipe(delay(this.delay)); // NOTE: simulate slow network
  }

  deleteMany$(ids: Array<UniqueId>): Observable<Array<UniqueId>> {
    return EMPTY;
  }

  deleteOne$(id: UniqueId): Observable<UniqueId> {
    // NOTE: fake impl
    return observableOf(id).pipe(delay(this.delay)); // NOTE: simulate slow network
  }
}
