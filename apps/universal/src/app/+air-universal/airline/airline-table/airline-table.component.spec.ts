import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { TranslateModule } from '@ngx-translate/core';
import { configureTestSuite } from 'ng-bullet';

import { AirlineTableComponent } from './airline-table.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, RouterTestingModule, CoreTestingModule, I18NTestingModule, MaterialModule, TranslateModule],
    declarations: [AirlineTableComponent]
  });
});

describe('AirlineTableComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AirlineTableComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });
});
