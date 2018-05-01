// angular
import { TestBed } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { StoreModule } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';

// framework
import { MaterialModule } from '~/app/framework/material/material.module';

// testing
import { t } from '~/app/framework/testing';
import { MockComponent, TestingModule } from '~/app/framework/testing/testing.module';
import { CoreTestingModule } from '~/app/framework/core/testing/core-testing.module';
import { AuthTestingModule } from '~/app/framework/auth/testing/auth-testing.module';
import { I18NTestingModule } from '~/app/framework/i18n/testing/i18n-testing.module';

// routes & components
import { HeaderComponent } from './header.component';

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
      RouterTestingModule.withRoutes(testRoutes),
      StoreModule.forRoot({}),
      MaterialModule,
      TestingModule,
      CoreTestingModule,
      AuthTestingModule,
      I18NTestingModule
    ],
    declarations: [
      TranslatePipe,
      HeaderComponent
    ]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('layout: HeaderComponent', () => {
    t.be(testModuleConfig);

    t.it('should build without a problem', t.async(() => {
      TestBed.compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(HeaderComponent);
          const instance = fixture.debugElement.componentInstance;
          fixture.detectChanges();
          t.e(instance)
            .toBeTruthy();
        });
    }));

    t.it('should be able to log out', t.async(() => {
      TestBed.compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(HeaderComponent);
          const instance = fixture.debugElement.componentInstance;
          fixture.detectChanges();

          instance.logout();
          t.e(instance.isAuthenticated)
            .toBeFalsy();
        });
    }));
  });
});
