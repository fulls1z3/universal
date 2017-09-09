// angular
import { NgModule } from '@angular/core';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export const mockBackendResponse = (connection: MockConnection, response: any) => {
  connection.mockRespond(new Response(new ResponseOptions({body: response})));
};

// for AoT compilation
export function httpFactory(mockBackend: MockBackend, options: BaseRequestOptions): Http {
  return new Http(mockBackend, options);
}

@NgModule({
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [
        MockBackend,
        BaseRequestOptions
      ]
    },
    MockBackend,
    BaseRequestOptions
  ]
})
export class HttpTestingModule {
}
