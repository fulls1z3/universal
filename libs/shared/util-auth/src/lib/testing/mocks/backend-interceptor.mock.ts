import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';

import { MOCK_AUTH_PATH } from '../tokens';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  constructor(@Inject(MOCK_AUTH_PATH) private readonly path: string) {}

  intercept(request: HttpRequest<never>, next: HttpHandler) {
    if (request.url.split('?')[0].endsWith(this.path) && request.method === 'POST') {
      const testUser = {
        username: 'valid',
        password: 'valid'
      };

      const body = JSON.parse(request.body);

      if (body.username === testUser.username && body.password === testUser.password) {
        return of(
          new HttpResponse({
            status: 200,
            body: { token: 'fake-jwt-token' }
          })
        );
      }

      return of(new HttpResponse({ status: 401 }));
    }

    return next.handle(request);
  }
}
