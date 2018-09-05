// angular
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';

// libs
import * as express from 'express';
import { Observable } from 'rxjs';

const getBaseUrl = (req: express.Request) => {
  return process.env.PORT
    ? `${req.protocol}://${req.hostname}:${process.env.PORT}`
    : `${req.protocol}://${req.hostname}`;
};

@Injectable()
export class UniversalInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector,
              @Inject(PLATFORM_ID) private readonly platformId: any) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isServer = isPlatformServer(this.platformId);

    if (isServer && !request.url.includes('http') && request.url.includes('./')) {
      const serverRequest = this.injector.get(REQUEST) as express.Request;
      const baseUrl = getBaseUrl(serverRequest);

      request = request.clone({
        url: `${baseUrl}/${request.url.replace('./', '')}`
      });
    }

    return next.handle(request);
  }
}
