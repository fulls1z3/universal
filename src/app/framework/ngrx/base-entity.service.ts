// angular
import { HttpClient } from '@angular/common/http';

// libs
import { Observable } from 'rxjs';
import { delay, map, retry } from 'rxjs/operators';
import { ConfigService } from '@ngx-config/core';

// shared
import { HTTP_CLIENT__MAX_RETRIES } from '~/app/shared';

// module
import { BaseDocument } from './models/base-document';
import { UniqueId } from './models/unique-id';

export abstract class BaseEntityService<T extends BaseDocument> {
  protected constructor(protected readonly config: ConfigService,
                        protected readonly http: HttpClient,
                        private readonly settingsKey: string | Array<string>) {
  }

  getAll$(): Observable<Array<T>> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http
      .get<Array<T>>(backend.endpoint)
      .pipe(
        delay(2000), // NOTE: simulate slow network
        retry(HTTP_CLIENT__MAX_RETRIES)
      );
  }

  get$(id: UniqueId): Observable<T> {
    const backend = this.config.getSettings(this.settingsKey);

    return this.http
      .get<Array<T>>(backend.endpoint)
      .pipe(
        delay(2000), // NOTE: simulate slow network
        retry(HTTP_CLIENT__MAX_RETRIES),
        map(cur => cur
          .find(airline => airline._id === id))
      );
  }

  abstract createMany$(resources: Array<T>): Observable<T>;
  abstract createOne$(resource: T): Observable<T>;

  abstract updateMany$(resources: Array<T>): Observable<T>;
  abstract updateOne$(resource: T): Observable<T>;

  abstract deleteMany$(ids: Array<UniqueId>): Observable<UniqueId>;
  abstract deleteOne$(id: UniqueId): Observable<UniqueId>;
}
