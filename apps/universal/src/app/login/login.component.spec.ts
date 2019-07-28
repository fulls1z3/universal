import { async, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@ngx-auth/core';
import { TranslatePipe } from '@ngx-translate/core';
import { configureTestSuite } from 'ng-bullet';

import { AuthTestingModule } from '../framework/auth/testing';
import { CoreTestingModule } from '../framework/core/testing';
import { I18NTestingModule } from '../framework/i18n/testing';
import { MaterialModule } from '../framework/material';
import { NgrxTestingModule } from '../framework/ngrx/testing';
import { MockComponent, TestingModule } from '../framework/testing';

import { LoginComponent } from './login.component';

const MOCK_ROUTES = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MockComponent
      },
      {
        path: 'login',
        component: MockComponent
      }
    ]
  }
];

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      RouterTestingModule.withRoutes(MOCK_ROUTES),
      CoreTestingModule,
      AuthTestingModule,
      I18NTestingModule,
      NgrxTestingModule,
      TestingModule,
      MaterialModule
    ],
    declarations: [TranslatePipe, LoginComponent]
  });
});

describe('login: LoginComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });

  test(
    'should redirect to `defaultUrl` while authenticated',
    async(
      inject([AuthService, Router], (auth: AuthService, router: Router) => {
        const fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();

        const expected = `${auth.defaultUrl}/`;

        auth.authenticate('valid', 'valid').subscribe(() => {
          expect(router.url).toEqual(expected);
        });
      })
    )
  );

  test(
    'should authenticate w/valid combination',
    async(() => {
      const fixture = TestBed.createComponent(LoginComponent);
      const instance = fixture.componentInstance;
      fixture.detectChanges();

      instance.username = 'valid';
      instance.password = 'valid';

      instance.login().subscribe(() => {
        expect(instance.error$).toBeUndefined();
        expect(instance.note$).toBeDefined();
      });
    })
  );

  test(
    'should not authenticate w/o valid combination',
    inject([AuthService], async (auth: AuthService) =>
      auth.invalidate().then(() => {
        const fixture = TestBed.createComponent(LoginComponent);
        const instance = fixture.componentInstance;
        fixture.detectChanges();

        instance.username = 'invalid';
        instance.password = 'invalid';

        instance.login().subscribe(() => {
          expect(instance.error$).toBeDefined();
        });
      })
    )
  );
});
