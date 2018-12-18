// angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

// libs
import { Observable } from 'rxjs';
import { flow, get } from 'lodash/fp';
import { AuthLoader } from '@ngx-auth/core';

const getHeaders = (request: HttpRequest<any>) => (token: string) => token
  ? request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  : request;

@Injectable()
export class MockJwtInterceptor implements HttpInterceptor {
  constructor(private readonly loader: AuthLoader) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const intercepted = flow(
      (cur: string) => this.loader.storage.getItem(cur),
      cur => JSON.parse(cur),
      get('token'),
      getHeaders(request)
    )(this.loader.storageKey);

    return next.handle(intercepted);
  }
}
