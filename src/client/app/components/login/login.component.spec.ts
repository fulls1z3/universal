// angular
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { StoreModule } from '@ngrx/store';
import { AuthService } from '@ngx-auth/core';
import { TranslatePipe } from '@ngx-translate/core';

// framework
import { MaterialModule } from '../../framework/material/material.module';

// testing
import { t } from '../../framework/testing';
import { MockComponent, TestingModule } from '../../framework/testing/testing.module';
import { CoreTestingModule } from '../../framework/core/testing/core-testing.module';
import { AuthTestingModule } from '../../framework/auth/testing/auth-testing.module';
import { I18NTestingModule } from '../../framework/i18n/testing/i18n-testing.module';

// routes & components
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

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      RouterTestingModule.withRoutes(testRoutes),
      MaterialModule,
      StoreModule.forRoot({}),
      TestingModule,
      CoreTestingModule,
      AuthTestingModule,
      I18NTestingModule
    ],
    declarations: [
      TranslatePipe,
      LoginComponent
    ]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('components', () => {
    t.describe('login: LoginComponent', () => {
      t.be(testModuleConfig);

      t.it('should build without a problem', t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(LoginComponent);
            const instance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            t.e(instance)
              .toBeTruthy();
          });
      }));

      t.it('should be able to redirect to `defaultUrl` while authenticated', t.async(t.inject([AuthService], (auth: AuthService) => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(LoginComponent);
            fixture.detectChanges();

            auth.authenticate('valid', 'valid')
              .subscribe(() => {
                const router = TestBed.get(Router);
                t.e(router.url)
                  .toEqual(`${auth.defaultUrl}/`);
              });
          });
      })));

      t.it('should be able to authenticate w/valid combination', t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(LoginComponent);
            const instance = fixture.debugElement.componentInstance;
            fixture.detectChanges();

            instance.username = 'valid';
            instance.username = 'valid';

            instance.login();

            t.e(instance.note$)
              .toBeDefined();
            t.e(instance.warn$)
              .toBeUndefined();
          });
      }));

      t.it('should not authenticate w/o valid combination', t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            const auth = TestBed.get(AuthService);
            auth.invalidate();

            const fixture = TestBed.createComponent(LoginComponent);
            const instance = fixture.debugElement.componentInstance;
            fixture.detectChanges();

            instance.username = 'invalid';
            instance.username = 'invalid';

            instance.login();

            t.e(instance.note$)
              .toBeDefined();
            t.e(instance.warn$)
              .toBeDefined();
          });
      }));
    });
  });
});
