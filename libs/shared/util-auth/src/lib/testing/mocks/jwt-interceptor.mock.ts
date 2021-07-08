import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLoader } from '@ngx-auth/core';
import { flow, get } from 'lodash/fp';

const getHeaders = (request: HttpRequest<never>) => (token: string) =>
  token
    ? request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : request;

@Injectable()
export class MockJwtInterceptor implements HttpInterceptor {
  constructor(private readonly loader: AuthLoader) {}

  intercept(request: HttpRequest<never>, next: HttpHandler) {
    const intercepted = flow(
      (cur: string) => this.loader.storage.getItem(cur),
      cur => JSON.parse(cur),
      get('token'),
      getHeaders(request)
    )(this.loader.storageKey);

    return next.handle(intercepted);
  }
}
