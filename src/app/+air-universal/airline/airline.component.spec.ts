// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexModule } from '@angular/flex-layout';

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
import { DataTableModule } from '~/app/shared/data-table';
import { SharedModule } from '~/app/shared';

// module
import { AirlineComponent } from './airline.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MaterialModule,
      CoreTestingModule,
      I18NTestingModule,
      NgrxTestingModule,
      SharedModule,
      DataTableModule,
      FlexModule
    ],
    declarations: [AirlineComponent]
  });
});

t.describe('prime-travel/backoffice', () => {
  t.describe('+air-universal/airline: AirlineComponent', () => {
    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(AirlineComponent);
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      const store$ = fixture.debugElement.injector.get(Store);

      t.e(instance)
        .toBeTruthy();
    });
  });
});
