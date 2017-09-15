// angular
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// libs
import { AuthModule } from '@ngx-auth/core';

// module
import { HttpTestingModule } from '../../http/testing/http-testing.module';
import { fakeBackendFactory } from './mocks/auth-backend.mock';

export * from './mocks/auth-backend.mock';

export const MOCK_AUTH_PATH = new InjectionToken<string>('MOCK_AUTH_PATH');

@NgModule({
  imports: [HttpTestingModule],
  exports: [AuthModule],
  providers: [
    {
      provide: MOCK_AUTH_PATH,
      useValue: '/api/authenticate'
    },
    {
      provide: Http,
      useFactory: fakeBackendFactory,
      deps: [
        MockBackend,
        BaseRequestOptions,
        MOCK_AUTH_PATH
      ]
    }
  ]
})
export class AuthTestingModule {
  static withPath(path: string): ModuleWithProviders {
    return {
      ngModule: AuthTestingModule,
      providers: [
        {
          provide: MOCK_AUTH_PATH,
          useValue: path
        }
      ]
    };
  }
}
