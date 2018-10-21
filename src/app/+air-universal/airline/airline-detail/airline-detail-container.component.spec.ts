// angular
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { Store } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';

// framework
import { MaterialModule } from '~/app/framework/material';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { t } from '~/app/framework/testing';

// shared
import { CardModule } from '~/app/shared/card';
import { SharedModule } from '~/app/shared';

// module
import { AirlineDetailContainerComponent } from './airline-detail-container.component';
import { AirlineDetailComponent } from './airline-detail.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      RouterTestingModule,
      MaterialModule,
      CoreTestingModule,
      I18NTestingModule,
      NgrxTestingModule,
      SharedModule,
      CardModule
    ],
    declarations: [
      AirlineDetailContainerComponent,
      AirlineDetailComponent
    ]
  });
});

t.describe('prime-travel/backoffice', () => {
  t.describe('+air-universal/airline/airline-detail-container: AirlineDetailContainerComponent', () => {
    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      const store$ = fixture.debugElement.injector.get(Store);

      t.e(instance)
        .toBeTruthy();
    });
  });
});
