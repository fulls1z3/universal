import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { AuthTestingModule } from '@fulls1z3/shared/util-auth/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { ERROR__NO_PAYLOAD } from '@fulls1z3/shared/util-store';
import { MockActions, StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { Actions } from '@ngrx/effects';
import { AuthService } from '@ngx-auth/core';
import { TranslateModule } from '@ngx-translate/core';
import { cold, hot } from 'jasmine-marbles';

import { authActions } from '../auth/auth.actions';
import { MockAuthService } from '../testing/auth/mocks/mock-auth.service';

import { AuthEffects } from './auth.effects';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      MaterialModule,
      AuthTestingModule,
      CoreTestingModule,
      I18NTestingModule,
      StoreTestingModule,
      TranslateModule
    ],
    providers: [
      AuthEffects,
      {
        provide: AuthService,
        useClass: MockAuthService
      }
    ]
  });
};

describe('AuthEffects', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should build without a problem', inject([AuthEffects], (effects: AuthEffects) => {
    expect(effects).toBeTruthy();
  }));

  describe('login$', () => {
    test('should dispatch `accountLoginSuccess` action, on login', inject([AuthEffects, Router], (effects: AuthEffects, router: Router) => {
      const action = authActions.accountLogin({
        resource: {
          email: 'abc@xyz.com',
          password: '123456'
        }
      });
      const completion = authActions.accountLoginSuccess(true);

      spyOn(router, 'navigateByUrl');

      const actions$ = TestBed.inject(Actions);
      // prettier-ignore
      (actions$).stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.login$).toBeObservable(expected);
    }));

    test('should dispatch `accountLoginFail` action, w/o payload', inject([AuthEffects], (effects: AuthEffects) => {
      const action = authActions.accountLogin(undefined);
      const completion = authActions.accountLoginFail(ERROR__NO_PAYLOAD.message);

      const actions$ = TestBed.inject(Actions);
      // prettier-ignore
      (actions$).stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.login$).toBeObservable(expected);
    }));
  });

  describe('logout$', () => {
    test('should dispatch `accountLogoutSuccess` action, on logout', inject(
      [AuthEffects, Router],
      (effects: AuthEffects, router: Router) => {
        const action = authActions.accountLogout({ router });
        const completion = authActions.accountLogoutSuccess();

        spyOn(router, 'navigateByUrl');

        const actions$ = TestBed.inject(Actions);
        // prettier-ignore
        (actions$).stream = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.logout$).toBeObservable(expected);
      }
    ));
  });
});
