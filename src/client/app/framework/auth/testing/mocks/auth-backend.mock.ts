// angular
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, path: string): Http {
  backend.connections
    .subscribe((connection: MockConnection) => {
      const testUser: any = {
        username: 'valid',
        password: 'valid'
      };

      if (connection.request.url.split('?')[0].endsWith(path)
        && connection.request.method === RequestMethod.Post) {
        const params = JSON.parse(connection.request.getBody());

        if (params.username === testUser.username && params.password === testUser.password)
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: {token: 'fake-jwt-token'}
            })
          ));
        else
          connection.mockRespond(new Response(
            new ResponseOptions({status: 200})
          ));
      }
    });

  return new Http(backend, options);
}
