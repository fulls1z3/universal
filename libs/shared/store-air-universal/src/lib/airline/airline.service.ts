import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, HTTP_CLIENT__MAX_RETRIES, UniqueId } from '@fulls1z3/shared/util-store';
import { ConfigService } from '@ngx-config/core';
import { EMPTY, of } from 'rxjs';
import { delay, map, retry } from 'rxjs/operators';

import { Airline } from './airline.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineService extends BaseService<Airline> {
  private _delay = 2000;

  set delay(value: number) {
    this._delay = value;
  }

  constructor(protected readonly config: ConfigService, protected readonly http: HttpClient) {
    super(config, http, ['backend', 'flight', 'airline']);
  }

  getMany$() {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.get<Array<Airline>>(backend.endpoint).pipe(
      delay(this._delay), // NOTE: simulate slow network
      retry(HTTP_CLIENT__MAX_RETRIES)
    );
  }

  getOne$(id: UniqueId) {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.get<Array<Airline>>(backend.endpoint).pipe(
      delay(this._delay), // NOTE: simulate slow network
      retry(HTTP_CLIENT__MAX_RETRIES),
      map(cur => cur.find(item => item.id === id))
    );
  }

  createMany$() {
    return EMPTY;
  }

  createOne$(resource: Airline) {
    // NOTE: fake impl
    return of({
      ...resource,
      id: '100000000000000000000001'
    }).pipe(delay(this._delay)); // NOTE: simulate slow network
  }

  updateMany$() {
    return EMPTY;
  }

  updateOne$(resource: Airline) {
    // NOTE: fake impl
    return of(resource).pipe(delay(this._delay)); // NOTE: simulate slow network
  }

  deleteMany$() {
    return EMPTY;
  }

  deleteOne$(id: UniqueId) {
    // NOTE: fake impl
    return of(id).pipe(delay(this._delay)); // NOTE: simulate slow network
  }
}
