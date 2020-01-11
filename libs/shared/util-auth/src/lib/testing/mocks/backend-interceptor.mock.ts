import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

import { MOCK_AUTH_PATH } from '../tokens';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  constructor(@Inject(MOCK_AUTH_PATH) private readonly path: string) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.split('?')[0].endsWith(this.path) && request.method === 'POST') {
      const testUser = {
        username: 'valid',
        password: 'valid'
      };

      const body = JSON.parse(request.body);

      if (body.username === testUser.username && body.password === testUser.password) {
        return observableOf(
          new HttpResponse({
            status: 200,
            body: { token: 'fake-jwt-token' }
          })
        );
      }

      return observableOf(new HttpResponse({ status: 401 }));
    }

    return next.handle(request);
  }
}
