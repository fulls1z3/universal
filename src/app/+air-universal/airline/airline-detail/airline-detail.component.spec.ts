// angular
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

// libs
import { configureTestSuite } from 'ng-bullet';

// framework
import { MaterialModule } from '~/app/framework/material';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { t } from '~/app/framework/testing';

// shared
import { CardModule } from '~/app/shared/card';
import { SharedModule } from '~/app/shared';

// module
import { AirlineDetailComponent } from './airline-detail.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      MaterialModule,
      CoreTestingModule,
      I18NTestingModule,
      SharedModule,
      CardModule
    ],
    declarations: [AirlineDetailComponent]
  });
});

t.describe('prime-travel/backoffice', () => {
  t.describe('+air-universal/airline/airline-detail: AirlineDetailComponent', () => {
    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(AirlineDetailComponent);
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      t.e(instance)
        .toBeTruthy();
    });
  });
});
