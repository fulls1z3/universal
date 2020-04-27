import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERROR__NO_PAYLOAD } from '@fulls1z3/shared/util-store';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from '@ngx-auth/core';
import { flow, get, isEmpty } from 'lodash/fp';
import { from, of as observableOf } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import { authActions } from './auth.actions';
import { State } from './auth.state';

const validateLogin = (payload: any) =>
  flow(
    (cur: any) => [get('resource.email')(cur), get('resource.password')(cur)],
    ([email, password]) => !(isEmpty(email) || isEmpty(password))
  )(payload);

@Injectable()
export class AuthEffects {
  @Effect() readonly login$ = this.actions.pipe(
    filter(authActions.is.accountLogin),
    map(get('payload')),
    switchMap(payload =>
      validateLogin(payload)
        ? this.auth.authenticate(payload.resource.email, payload.resource.password).pipe(
            tap(async () => this.router.navigateByUrl('/')),
            map(authActions.accountLoginSuccess),
            catchError(error => observableOf(authActions.accountLoginFail(error)))
          )
        : observableOf(authActions.accountLoginFail(ERROR__NO_PAYLOAD.message))
    )
  );

  @Effect() readonly logout$ = this.actions.pipe(
    filter(authActions.is.accountLogout),
    map(get('payload')),
    switchMap(payload =>
      from(this.auth.invalidate()).pipe(
        map(() => authActions.accountLogoutSuccess()),
        tap(async () => this.router.navigateByUrl('/'))
      )
    )
  );

  constructor(
    private readonly store$: Store<State>,
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly auth: AuthService
  ) {}
}
