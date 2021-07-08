import { isPlatformServer } from '@angular/common';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { flow, getOr } from 'lodash/fp';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export const getBaseUrl = (config: ConfigService) => (isServer: boolean) =>
  flow(
    (cur: ConfigService) => cur.getSettings(''),
    getOr('')(!isServer ? 'backend.baseBrowserUrl' : 'backend.baseServerUrl')
  )(config);

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector, @Inject(PLATFORM_ID) private readonly platformId) {}

  intercept(request: HttpRequest<never>, next: HttpHandler) {
    return new Observable(observer => {
      const item = this.injector.get(ConfigService);
      observer.next(item);
      observer.complete();
    }).pipe(
      mergeMap((res: ConfigService) => {
        const intercepted = flow(
          isPlatformServer,
          getBaseUrl(res),
          cur => request.url.replace('{baseUrl}', cur),
          url => request.clone({ url })
        )(this.platformId);

        return next.handle(intercepted);
      })
    );
  }
}
