// angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

// libs
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { AuthLoader } from '@ngx-auth/core';

@Injectable()
export class MockJwtInterceptor implements HttpInterceptor {
  constructor(private readonly loader: AuthLoader) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = _.get(JSON.parse(this.loader.storage.getItem(this.loader.storageKey)), 'token');

    if (token)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    return next.handle(request);
  }
}
