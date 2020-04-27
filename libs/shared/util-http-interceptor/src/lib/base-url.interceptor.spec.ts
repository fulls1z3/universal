import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { ConfigService } from '@ngx-config/core';
import { configureTestSuite } from 'ng-bullet';

import { BaseUrlInterceptor, getBaseUrl } from './base-url.interceptor';
import { MockService } from './testing/mocks/service.mock';

const MOCK_BASE_BROWSER_URL = 'http://localhost:4200';
const MOCK_BASE_SERVER_URL = 'http://localhost:4000';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, CoreTestingModule],
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

describe('getBaseUrl for `browser` platform', () => {
  test('should return `baseBrowserUrl`', inject([ConfigService], (config: ConfigService) => {
    const actual = getBaseUrl(config)(false);
    const expected = `${MOCK_BASE_BROWSER_URL}`;

    expect(actual).toEqual(expected);
  }));
});

describe('getBaseUrl for `server` platform', () => {
  test('should return `baseBrowserUrl`', inject([ConfigService], (config: ConfigService) => {
    const actual = getBaseUrl(config)(true);
    const expected = `${MOCK_BASE_SERVER_URL}`;

    expect(actual).toEqual(expected);
  }));
});

describe('BaseUrlInterceptor', () => {
  test('should build without a problem', inject([BaseUrlInterceptor], (instance: BaseUrlInterceptor) => {
    expect(instance).toBeTruthy();
  }));

  test('should return an intercepted request with `baseUrl` replacement', async(
    inject([MockService, HttpTestingController], (service: MockService, http: HttpTestingController) => {
      service.fetch$().subscribe(res => {
        expect(res).toBeTruthy();
      });

      const { request } = http.expectOne({ method: 'GET' });
      const expected = 'http://localhost:4200/test';

      expect(request.url).toEqual(expected);

      http.verify();
    })
  ));
});
