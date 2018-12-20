import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@ngx-config/core';
import { flow } from 'lodash/fp';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { HTTP_CLIENT__MAX_RETRIES } from './constants';
import { BaseDocument, UniqueId } from './models/base-document';

export abstract class BaseEntityService<T extends BaseDocument> {
  protected constructor(
    protected readonly config: ConfigService,
    protected readonly http: HttpClient,
    protected readonly settingsKey: string | Array<string>
  ) {}

  getMany$(): Observable<Array<T>> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.get<Array<T>>(backend.endpoint).pipe(retry(HTTP_CLIENT__MAX_RETRIES));
  }

  getOne$(id: UniqueId): Observable<T> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.get<T>(`${backend.endpoint}/${id}`).pipe(retry(HTTP_CLIENT__MAX_RETRIES));
  }

  createMany$(resources: Array<T>): Observable<Array<T>> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.post<Array<T>>(backend.endpoint, resources).pipe(retry(HTTP_CLIENT__MAX_RETRIES));
  }

  createOne$(resource: T): Observable<T> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.post<T>(backend.endpoint, resource).pipe(retry(HTTP_CLIENT__MAX_RETRIES));
  }

  updateMany$(resources: Array<T>): Observable<Array<T>> {
    const backend = this.config.getSettings(this.settingsKey);

    return flow(
      (cur: Array<T>) => cur.map(resource => resource._id).join(','),
      cur => this.http.patch<Array<T>>(`${backend.endpoint}/${cur}`, resources).pipe(retry(HTTP_CLIENT__MAX_RETRIES))
    )(resources);
  }

  updateOne$(resource: T): Observable<T> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.patch<T>(`${backend.endpoint}/${resource._id}`, resource).pipe(retry(HTTP_CLIENT__MAX_RETRIES));
  }

  deleteMany$(ids: Array<UniqueId>): Observable<Array<UniqueId>> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.delete<Array<UniqueId>>(`${backend.endpoint}/${ids.join(',')}`).pipe(retry(HTTP_CLIENT__MAX_RETRIES));
  }

  deleteOne$(id: UniqueId): Observable<UniqueId> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http.delete<UniqueId>(`${backend.endpoint}/${id}`).pipe(retry(HTTP_CLIENT__MAX_RETRIES));
  }
}
