// angular
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { AuthService } from '@ngx-auth/core';
import { TranslatePipe } from '@ngx-translate/core';
import { configureTestSuite } from 'ng-bullet';

// framework
import { MaterialModule } from '~/app/framework/material';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { AuthTestingModule } from '~/app/framework/auth/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { MockComponent, TestingModule } from '~/app/framework/testing/testing.module';
import { t } from '~/app/framework/testing';

// module
import { LoginComponent } from './login.component';

const testRoutes: Routes = [
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
      RouterTestingModule.withRoutes(testRoutes),
      MaterialModule,
      TestingModule,
      CoreTestingModule,
      AuthTestingModule,
      I18NTestingModule,
      NgrxTestingModule
    ],
    declarations: [
      TranslatePipe,
      LoginComponent
    ]
  });
});

t.describe('ng-seed/universal', () => {
  t.describe('login: LoginComponent', () => {
    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const instance = fixture.debugElement.componentInstance;

      fixture.detectChanges();

      t.e(instance)
        .toBeTruthy();
    });

    t.it('should redirect to `defaultUrl` while authenticated', (t.inject([AuthService], (auth: AuthService) => {
      const fixture = TestBed.createComponent(LoginComponent);

      fixture.detectChanges();

      auth.authenticate('valid', 'valid')
        .subscribe(() => {
          const router = TestBed.get(Router);
          t.e(router.url)
            .toEqual(`${auth.defaultUrl}/`);
        });
    })));

    t.it('should authenticate w/valid combination', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const instance = fixture.debugElement.componentInstance;

      fixture.detectChanges();

      instance.username = 'valid';
      instance.password = 'valid';

      instance.login();

      t.e(instance.note$)
        .toBeDefined();
      t.e(instance.warn$)
        .toBeUndefined();
    });

    t.it('should not authenticate w/o valid combination', () => {
      const auth = TestBed.get(AuthService);
      auth.invalidate();

      const fixture = TestBed.createComponent(LoginComponent);
      const instance = fixture.debugElement.componentInstance;

      fixture.detectChanges();

      instance.username = 'invalid';
      instance.password = 'invalid';

      instance.login();

      t.e(instance.note$)
        .toBeDefined();
      t.e(instance.warn$)
        .toBeDefined();
    });
  });
});
