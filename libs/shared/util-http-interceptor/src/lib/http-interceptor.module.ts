import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule, PLATFORM_ID } from '@angular/core';

import { BaseUrlInterceptor } from './base-url.interceptor';
import { UniversalInterceptor } from './universal.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      deps: [Injector, PLATFORM_ID],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      deps: [Injector, PLATFORM_ID],
      multi: true
    }
  ]
})
export class HttpInterceptorModule {}
