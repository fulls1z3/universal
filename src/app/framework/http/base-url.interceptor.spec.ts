import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '@ngx-config/core';
import { configureTestSuite } from 'ng-bullet';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { t } from '~/app/framework/testing';

import { BaseUrlInterceptor, getBaseUrl } from './base-url.interceptor';
import { MockService } from './testing';

const MOCK_BASE_BROWSER_URL = 'http://localhost:4200';
const MOCK_BASE_SERVER_URL = 'http://localhost:4000';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, CoreTestingModule.withOptions()],
    providers: [
      {
        provide: MockService,
        useFactory: (config: ConfigService, http: HttpClient) => new MockService(config, http, 'backend.test.remote'),
        deps: [ConfigService, HttpClient]
      },
      BaseUrlInterceptor,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: BaseUrlInterceptor,
        multi: true
      }
    ]
  });
});

t.describe('getBaseUrl for `browser` platform', () => {
  t.it(
    'should return `baseBrowserUrl`',
    t.inject([ConfigService], (config: ConfigService) => {
      const actual = getBaseUrl(config)(false);
      const expected = `${MOCK_BASE_BROWSER_URL}`;

      t.e(actual).toEqual(expected);
    })
  );
});

t.describe('getBaseUrl for `server` platform', () => {
  t.it(
    'should return `baseBrowserUrl`',
    t.inject([ConfigService], (config: ConfigService) => {
      const actual = getBaseUrl(config)(true);
      const expected = `${MOCK_BASE_SERVER_URL}`;

      t.e(actual).toEqual(expected);
    })
  );
});

t.describe('BaseUrlInterceptor', () => {
  t.it(
    'should build without a problem',
    t.inject([BaseUrlInterceptor], (instance: BaseUrlInterceptor) => {
      t.e(instance).toBeTruthy();
    })
  );

  t.it(
    'should return an intercepted request with `baseUrl` replacement',
    t.async(
      t.inject([MockService, HttpTestingController], (service: MockService, http: HttpTestingController) => {
        service.fetch$().subscribe(res => {
          t.e(res).toBeTruthy();
        });

        const { request } = http.expectOne({ method: 'GET' });
        const expected = 'http://localhost:4200/test';

        t.e(request.url).toEqual(expected);

        http.verify();
      })
    )
  );
});
