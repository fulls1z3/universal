import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { ConfigService } from '@ngx-config/core';
import { configureTestSuite } from 'ng-bullet';

import { MockService } from './testing/mocks/service.mock';
import { getAbsolutePath, getBaseUrl, UniversalInterceptor } from './universal.interceptor';

const MOCK_BASE_URL = 'https://yourdomain.com';
const MOCK_REQUEST: any = {
  protocol: 'https',
  get: () => 'yourdomain.com'
};

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, CoreTestingModule],
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

describe('getBaseUrl', () => {
  test('should return the URL from the server platform', () => {
    const actual = getBaseUrl(MOCK_REQUEST);

    expect(actual).toEqual(MOCK_BASE_URL);
  });
});

describe('getAbsolutePath for `browser` platform', () => {
  test('should bypass the request', () => {
    const request = new HttpRequest<any>('GET', './test');
    const res = getAbsolutePath(MOCK_REQUEST)(request)(false);

    const expected = './test';

    expect(res.url).toEqual(expected);
  });
});

describe('getAbsolutePath for `server` platform', () => {
  test('should return an intercepted request with `baseServerUrl`', () => {
    const request = new HttpRequest<any>('GET', './test');
    const res = getAbsolutePath(MOCK_REQUEST)(request)(true);

    const expected = `${MOCK_BASE_URL}/test`;

    expect(res.url).toEqual(expected);
  });

  test('should bypass the request when the request has absolute url', () => {
    const request = new HttpRequest<any>('GET', `${MOCK_BASE_URL}/test`);
    const res = getAbsolutePath(MOCK_REQUEST)(request)(true);

    const expected = `${MOCK_BASE_URL}/test`;

    expect(res.url).toEqual(expected);
  });
});

describe('UniversalInterceptor', () => {
  test('should build without a problem', inject([UniversalInterceptor], (instance: UniversalInterceptor) => {
    expect(instance).toBeTruthy();
  }));

  test('should return an intercepted request', async(
    inject([MockService, HttpTestingController], (service: MockService, http: HttpTestingController) => {
      service.fetch$().subscribe(res => {
        expect(res).toBeTruthy();
      });

      const { request } = http.expectOne({ method: 'GET' });
      const expected = './test';

      expect(request.url).toEqual(expected);

      http.verify();
    })
  ));
});
