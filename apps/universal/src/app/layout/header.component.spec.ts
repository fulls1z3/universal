import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { configureTestSuite } from 'ng-bullet';

import { AuthTestingModule } from '../framework/auth/testing';
import { CoreTestingModule } from '../framework/core/testing';
import { I18NTestingModule } from '../framework/i18n/testing';
import { MaterialModule } from '../framework/material';
import { NgrxTestingModule } from '../framework/ngrx/testing';
import { MockComponent, TestingModule } from '../framework/testing';

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

describe('HeaderComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });

  test('should log out', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    instance.isAuthenticated = true;
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('button.qa-header__logout'));
    logoutButton.triggerEventHandler('click', {});

    expect(instance.isAuthenticated).toBeFalsy();
  });
});
