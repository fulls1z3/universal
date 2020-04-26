import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { configureTestSuite } from 'ng-bullet';

import { SharedModule } from '../../shared';

import { UsComponent } from './us.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, CoreTestingModule, I18NTestingModule, MaterialModule, SharedModule],
    declarations: [UsComponent]
  });
});

describe('UsComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(UsComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });
});
