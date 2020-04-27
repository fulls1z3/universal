import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AIRLINE, Airline, airlineActions } from '@fulls1z3/shared/store-air-universal';
import { MOCK_AIRLINE } from '@fulls1z3/shared/store-air-universal/testing';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { EMPTY_UNIQUE_ID } from '@fulls1z3/shared/util-store';
import { getState, MockStore, StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { of as observableOf } from 'rxjs';

import { RenderFlag, SharedModule } from '../../../shared';
import { FalsyModule } from '../../../shared/falsy/falsy.module';

import { AirlineDetailFormComponent } from './airline-detail-form/airline-detail-form.component';
import { AirlineDetailHeaderComponent } from './airline-detail-header/airline-detail-header.component';
import { AirlineDetailComponent } from './airline-detail.component';

const testModuleConfig = (renderFlag = RenderFlag.Create) => {
  TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      RouterTestingModule,
      MaterialModule,
      CoreTestingModule,
      I18NTestingModule,
      StoreTestingModule,
      MaterialModule,
      SharedModule,
      FalsyModule
    ],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          data: observableOf({
            renderFlag,
            meta: {
              title: 'PAGE_TITLE'
            }
          }),
          params: observableOf({
            id: renderFlag === RenderFlag.Update ? MOCK_AIRLINE.id : EMPTY_UNIQUE_ID
          })
        }
      }
    ],
    declarations: [AirlineDetailFormComponent, AirlineDetailHeaderComponent, AirlineDetailComponent]
  });
};

describe('AirlineDetailComponent', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AirlineDetailComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });

  test('should `getSelected` from AirlineSelectors on init', () => {
    const fixture = TestBed.createComponent(AirlineDetailComponent);
    const store$ = TestBed.inject(Store);
    const state = getState<Airline>(AIRLINE, MOCK_AIRLINE);
    (store$ as MockStore<{}>).setState(state);
    fixture.detectChanges();

    const actual = fixture.componentInstance.airline$;
    const expected = cold('a', { a: MOCK_AIRLINE });

    expect(actual).toBeObservable(expected);
  });

  test('should dispatch `airUniversalAddOneAirline` action on init', () => {
    const fixture = TestBed.createComponent(AirlineDetailComponent);
    const store$ = TestBed.inject(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const action = airlineActions.airUniversalAddOneAirline();

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('AirlineDetailComponent for renderFlag=`Update`', () => {
  beforeEach(() => {
    testModuleConfig(RenderFlag.Update);
  });

  test('should dispatch `airUniversalGetOneAirline` action on init', () => {
    const fixture = TestBed.createComponent(AirlineDetailComponent);
    const store$ = TestBed.inject(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const action = airlineActions.airUniversalGetOneAirline(MOCK_AIRLINE.id);

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
