import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { ConfigService } from '@ngx-config/core';
import { configureTestSuite } from 'ng-bullet';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { t } from '~/app/framework/testing';

import { MockService } from './testing';
import { getAbsolutePath, getBaseUrl, UniversalInterceptor } from './universal.interceptor';

const MOCK_BASE_URL = 'https://yourdomain.com';
const MOCK_REQUEST: any = {
  protocol: 'https',
  get: () => 'yourdomain.com'
};

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, CoreTestingModule.withOptions()],
    providers: [
      {
        provide: MockService,
        useFactory: (config: ConfigService, http: HttpClient) => new MockService(config, http, 'backend.test.local'),
        deps: [ConfigService, HttpClient]
      },
      UniversalInterceptor,
      {
        provide: REQUEST,
        useFactory: () => ({
          protocol: 'http',
          get: () => 'localhost:4200'
        })
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: UniversalInterceptor,
        multi: true
      }
    ]
  });
});

t.describe('getBaseUrl', () => {
  t.it('should return the URL from the server platform', () => {
    const actual = getBaseUrl(MOCK_REQUEST);

    t.e(actual).toEqual(MOCK_BASE_URL);
  });
});

t.describe('getAbsolutePath for `browser` platform', () => {
  t.it('should bypass the request', () => {
    const request = new HttpRequest<any>('GET', './test');
    const res = getAbsolutePath(MOCK_REQUEST)(request)(false);

    const expected = './test';

    t.e(res.url).toEqual(expected);
  });
});

t.describe('getAbsolutePath for `server` platform', () => {
  t.it('should return an intercepted request with `baseServerUrl`', () => {
    const request = new HttpRequest<any>('GET', './test');
    const res = getAbsolutePath(MOCK_REQUEST)(request)(true);

    const expected = `${MOCK_BASE_URL}/test`;

    t.e(res.url).toEqual(expected);
  });

  t.it('should bypass the request when the request has absolute url', () => {
    const request = new HttpRequest<any>('GET', `${MOCK_BASE_URL}/test`);
    const res = getAbsolutePath(MOCK_REQUEST)(request)(true);

    const expected = `${MOCK_BASE_URL}/test`;

    t.e(res.url).toEqual(expected);
  });
});

t.describe('UniversalInterceptor', () => {
  t.it(
    'should build without a problem',
    t.inject([UniversalInterceptor], (instance: UniversalInterceptor) => {
      t.e(instance).toBeTruthy();
    })
  );

  t.it(
    'should return an intercepted request',
    t.async(
      t.inject([MockService, HttpTestingController], (service: MockService, http: HttpTestingController) => {
        service.fetch$().subscribe(res => {
          t.e(res).toBeTruthy();
        });

        const { request } = http.expectOne({ method: 'GET' });
        const expected = './test';

        t.e(request.url).toEqual(expected);

        http.verify();
      })
    )
  );
});
