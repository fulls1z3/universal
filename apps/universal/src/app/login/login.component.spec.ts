import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { configureTestSuite } from 'ng-bullet';

import { LoginComponent } from './login.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      CoreTestingModule,
      RouterTestingModule,
      MaterialModule,
      I18NTestingModule,
      StoreTestingModule,
      TranslateModule
    ],
    declarations: [LoginComponent]
  });
});

describe('login: LoginComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });
});
