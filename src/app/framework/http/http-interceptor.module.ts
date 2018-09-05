// angular
import { Injector, NgModule, PLATFORM_ID } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// module
import { UniversalInterceptor } from './src/universal.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      deps: [
        Injector,
        PLATFORM_ID
      ],
      multi: true
    }
  ]
})
export class HttpInterceptorModule {
}
