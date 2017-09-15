// angular
import { Injector, NgModule } from '@angular/core';
import { Http, HttpModule as HTTP_MODULE, RequestOptions, XHRBackend } from '@angular/http';

// module
import { HttpInterceptor } from './src/http-interceptor.service';

export const httpInterceptorFactory = (backend: XHRBackend,
                                       defaultOptions: RequestOptions,
                                       injector: Injector) => {
  return new HttpInterceptor(backend, defaultOptions, injector);
};

@NgModule({
  imports: [HTTP_MODULE],
  providers: [
    {
      provide: Http,
      useFactory: httpInterceptorFactory,
      deps: [
        XHRBackend,
        RequestOptions,
        Injector
      ]
    }
  ]
})
export class HttpInterceptorModule {
}
