// angular
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { TranslatePipe } from '@ngx-translate/core';
import { configureTestSuite } from 'ng-bullet';

// framework
import { MaterialModule } from '~/app/framework/material';

// testing
import { AuthTestingModule } from '~/app/framework/auth/testing';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { MockComponent, TestingModule } from '~/app/framework/testing/testing.module';
import { t } from '~/app/framework/testing';

// module
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
      },
      {
        path: 'change-language/:languageCode',
        component: MockComponent
      }
    ]
  }
];

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
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
      HeaderComponent
    ]
  });
});

t.describe('ng-seed/universal', () => {
  t.describe('layout: HeaderComponent', () => {
    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(HeaderComponent);
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      t.e(instance)
        .toBeTruthy();
    });

    t.it('should log out', () => {
      const fixture = TestBed.createComponent(HeaderComponent);
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      instance.isAuthenticated = true;
      fixture.detectChanges();

      const logoutButton = fixture.debugElement.query(By.css('button.account_menu__button--logout'));
      logoutButton.triggerEventHandler('click', {});
      fixture.detectChanges();

      t.e(instance.isAuthenticated)
        .toBeFalsy();
    });
  });
});
