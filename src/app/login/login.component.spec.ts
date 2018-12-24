import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@ngx-auth/core';
import { TranslatePipe } from '@ngx-translate/core';
import { configureTestSuite } from 'ng-bullet';
import { AuthTestingModule } from '~/app/framework/auth/testing';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { MaterialModule } from '~/app/framework/material';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { MockComponent, t, TestingModule } from '~/app/framework/testing';

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

t.describe('login: LoginComponent', () => {
  t.it('should build without a problem', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const instance = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    t.e(instance).toBeTruthy();
  });

  t.it(
    'should redirect to `defaultUrl` while authenticated',
    t.async(
      t.inject([AuthService, Router], (auth: AuthService, router: Router) => {
        const fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();

        auth.authenticate('valid', 'valid').subscribe(() => {
          t.e(router.url).toEqual(`${auth.defaultUrl}/`);
        });
      })
    )
  );

  t.it(
    'should authenticate w/valid combination',
    t.async(() => {
      const fixture = TestBed.createComponent(LoginComponent);
      const instance = fixture.debugElement.componentInstance;
      fixture.detectChanges();

      instance.username = 'valid';
      instance.password = 'valid';

      instance.login().subscribe(() => {
        t.e(instance.note$).toBeDefined();
        t.e(instance.error$).toBeUndefined();
      });
    })
  );

  t.it(
    'should not authenticate w/o valid combination',
    t.inject([AuthService], async (auth: AuthService) =>
      auth.invalidate().then(() => {
        const fixture = TestBed.createComponent(LoginComponent);
        const instance = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        instance.username = 'invalid';
        instance.password = 'invalid';

        instance.login().subscribe(() => {
          t.e(instance.note$).toBeDefined();
          t.e(instance.error$).toBeDefined();
        });
      })
    )
  );
});
