// angular
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';

// libs
import { ConfigService } from '@ngx-config/core';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { t } from '~/app/framework/testing';
import { MockService } from './testing';

// module
import { UniversalInterceptor } from './universal.interceptor';

const testModuleConfig = (options?: any) => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoreTestingModule.withOptions(options)
      ],
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
            get: () => 'localhost:4000'
          })
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UniversalInterceptor,
          multi: true
        }
      ]
    });
};

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('http: UniversalInterceptor', () => {
      t.be(() => testModuleConfig());

      t.it('should build without a problem',
        t.inject([UniversalInterceptor], (interceptor: UniversalInterceptor) => {
          t.e(interceptor)
            .toBeTruthy();
        }));
    });

    t.describe('http: UniversalInterceptor for `browser` platform', () => {
      t.be(() => testModuleConfig());

      t.it('should bypass the request as is',
        t.async(
          t.inject([MockService, HttpTestingController], (service: MockService, http: HttpTestingController) => {
            service.fetch$()
              .subscribe(res => {
                t.e(res)
                  .toBeTruthy();
              });

            const actual = http.expectOne({method: 'GET'});
            const expected = './test';

            t.e(actual.request.url)
              .toEqual(expected);

            http.verify();
          })));
    });

    t.describe('http: UniversalInterceptor for `server` platform', () => {
      t.be(() => testModuleConfig({platformId: 'server'}));

      t.it('should include the `baseServerUrl` in the request',
        t.async(
          t.inject([MockService, HttpTestingController], (service: MockService, http: HttpTestingController) => {
            service.fetch$()
              .subscribe(res => {
                t.e(res)
                  .toBeTruthy();
              });

            const actual = http.expectOne({method: 'GET'});
            const expected = 'http://localhost:4000/test';

            t.e(actual.request.url)
              .toEqual(expected);

            http.verify();
          })));
    });
  });
});
