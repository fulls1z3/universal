// angular
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

// libs
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { flow, getOr } from 'lodash/fp';
import { ConfigService } from '@ngx-config/core';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector,
              @Inject(PLATFORM_ID) private readonly platformId: any) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.create((observer: any) => {
      const item = this.injector.get(ConfigService);
      observer.next(item);
      observer.complete();
    })
      .pipe(
        mergeMap((res: ConfigService) => {
          const isServer = isPlatformServer(this.platformId);
          const baseUrl = flow(
            (cur: ConfigService) => cur.getSettings(''),
            getOr('')(!isServer
              ? 'backend.baseBrowserUrl'
              : 'backend.baseServerUrl')
          )(res);

          if (baseUrl && request.url.indexOf('{baseUrl}') >= 0)
            request = request.clone({
              url: request.url.replace('{baseUrl}', baseUrl)
            });

          return next.handle(request);
        })
      );
  }
}
