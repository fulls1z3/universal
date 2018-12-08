// angular
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// libs
import { ConfigService } from '@ngx-config/core';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { t } from '~/app/framework/testing';
import { MockService } from './testing';

// module
import { BaseUrlInterceptor } from './base-url.interceptor';

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
};

t.describe('BaseUrlInterceptor', () => {
  t.be(() => testModuleConfig());

  t.it('should build without a problem',
    t.inject([BaseUrlInterceptor], (interceptor: BaseUrlInterceptor) => {
      t.e(interceptor)
        .toBeTruthy();
    }));
});

t.describe('BaseUrlInterceptor for `browser` platform', () => {
  t.be(() => testModuleConfig());

  t.it('should replace the `baseBrowserUrl` as `baseUrl`',
    t.async(
      t.inject([MockService, HttpTestingController], (service: MockService, http: HttpTestingController) => {
        service.fetch$()
          .subscribe(res => {
            t.e(res)
              .toBeTruthy();
          });

        const actual = http.expectOne({method: 'GET'});
        const expected = 'http://localhost:4200/test';

        t.e(actual.request.url)
          .toEqual(expected);

        http.verify();
      })));
});

t.describe('BaseUrlInterceptor for `server` platform', () => {
  t.be(() => testModuleConfig({platformId: 'server'}));

  t.it('should replace the `baseServerUrl` as `baseUrl`',
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
