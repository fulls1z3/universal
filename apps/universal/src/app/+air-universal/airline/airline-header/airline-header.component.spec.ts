import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { TranslateModule } from '@ngx-translate/core';
import { configureTestSuite } from 'ng-bullet';

import { AirlineHeaderComponent } from './airline-header.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, MaterialModule, CoreTestingModule, I18NTestingModule, TranslateModule],
    declarations: [AirlineHeaderComponent]
  });
});

describe('AirlineHeaderComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AirlineHeaderComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });
});
