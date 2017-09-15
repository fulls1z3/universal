// angular
import { Injectable, Injector } from '@angular/core';
import { ConnectionBackend, Http, RequestOptions, RequestOptionsArgs, Response, ResponseOptions } from '@angular/http';

// libs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { AuthService } from '@ngx-auth/core';

@Injectable()
export class HttpInterceptor extends Http {
  /**
   * Build the absolute API url.
   * @param url
   * @returns {string}
   */
  getAbsoluteUrl = (url: string): string => {
    return url;
  };

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  onCatch = (error: any, caught: Observable<any>): Observable<any> => {
    return Observable.throw(error);
  };

  /**
   * onSuccess
   * @param res
   */
  onSuccess = (res: Response): void => {
    // TODO: implement logic
    return;
  };

  /**
   * onError
   * @param error
   */
  onError = (error: any): void => {
    // TODO: implement logic
    return;
  };

  /**
   * onFinally
   */
  onFinally = (): void => {
    // TODO: implement logic
    return;
  };

  constructor(private readonly backend: ConnectionBackend,
              private readonly defaultOptions: RequestOptions,
              private readonly injector: Injector
  ) {
    super(backend, defaultOptions);
  }

  /**
   * Performs a request with `get` http method.
   * @param {string} url
   * @param {RequestOptionsArgs} options
   * @returns {Observable<any>}
   */
  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.get(this.getAbsoluteUrl(url), options)
      .catch(this.onCatch)
      .do((res: Response) => this.onSuccess(res),
        (error: any) => this.onError(error))
      .finally(() => this.onFinally());
  }

  /**
   * Performs a request with `post` http method.
   * @param {string} url
   * @param body
   * @param {RequestOptionsArgs} options
   * @returns {Observable<any>}
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    const testUser: any = {
      username: 'valid',
      password: 'valid'
    };
    const auth = this.injector.get(AuthService);

    if (url.split('?')[0].endsWith(auth.loader.backend.endpoint)) {
      const params = JSON.parse(body);

      if (params.username === testUser.username && params.password === testUser.password)
        return Observable.of(new Response(
          new ResponseOptions({
            status: 200,
            body: {token: 'fake-jwt-token'}
          })
        ));
      else
        return Observable.of(new Response(
          new ResponseOptions({status: 200})
        ));
    }

    return super.post(this.getAbsoluteUrl(url), body, options)
      .catch(this.onCatch)
      .do((res: Response) => this.onSuccess(res),
        (error: any) => this.onError(error))
      .finally(() => this.onFinally());
  }
}
