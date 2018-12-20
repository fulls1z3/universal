import { isPlatformServer } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { flow } from 'lodash/fp';
import { Observable } from 'rxjs';

export const getBaseUrl = (serverRequest: Request) => `${serverRequest.protocol}://${serverRequest.get('Host')}`;

export const getAbsolutePath = (serverRequest: Request) => (request: HttpRequest<any>) => (isServer: boolean) => {
  const isRelativePath = isServer && !request.url.includes('http') && request.url.includes('./');

  if (!isRelativePath) {
    return request;
  }

  const url = flow(
    getBaseUrl,
    cur => `${cur}/${request.url.replace('./', '')}`
  )(serverRequest);

  return request.clone({ url });
};

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector, @Inject(PLATFORM_ID) private readonly platformId: any) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const intercepted = flow(
      isPlatformServer,
      getAbsolutePath(this.injector.get(REQUEST))(request)
    )(this.platformId);

    return next.handle(intercepted);
  }
}
