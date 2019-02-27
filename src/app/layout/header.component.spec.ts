import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { configureTestSuite } from 'ng-bullet';
import { AuthTestingModule } from '~/app/framework/auth/testing';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { MaterialModule } from '~/app/framework/material';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { MockComponent, t, TestingModule } from '~/app/framework/testing';

import { HeaderComponent } from './header.component';

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
      RouterTestingModule.withRoutes(MOCK_ROUTES),
      AuthTestingModule,
      CoreTestingModule,
      I18NTestingModule,
      NgrxTestingModule,
      TestingModule,
      MaterialModule
    ],
    declarations: [TranslatePipe, HeaderComponent]
  });
});

t.describe('HeaderComponent', () => {
  t.it('should build without a problem', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    t.e(instance).toBeTruthy();
  });

  t.it('should log out', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    instance.isAuthenticated = true;
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('button.qa-header__logout'));
    logoutButton.triggerEventHandler('click', {});

    t.e(instance.isAuthenticated).toBeFalsy();
  });
});
