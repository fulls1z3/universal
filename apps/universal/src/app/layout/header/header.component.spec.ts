import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { AuthTestingModule } from '@fulls1z3/shared/util-auth/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { MockComponent, TestingModule } from '@fulls1z3/shared/util-testing';
import { TranslatePipe } from '@ngx-translate/core';

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

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    const p$ = TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(MOCK_ROUTES),
        AuthTestingModule,
        CoreTestingModule,
        I18NTestingModule,
        StoreTestingModule,
        TestingModule,
        MaterialModule
      ],
      declarations: [TranslatePipe, HeaderComponent]
    }).compileComponents();
  }));

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
