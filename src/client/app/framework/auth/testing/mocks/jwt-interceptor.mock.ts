// angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

// libs
import { Observable } from 'rxjs';
import { get } from 'lodash/fp';
import { AuthLoader } from '@ngx-auth/core';

@Injectable()
export class MockJwtInterceptor implements HttpInterceptor {
  constructor(private readonly loader: AuthLoader) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = get(JSON.parse(this.loader.storage.getItem(this.loader.storageKey)), 'token');

    if (token)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    return next.handle(request);
  }
}
