import { TestBed } from '@angular/core/testing';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AIRLINE, Airline, airlineActions } from '@fulls1z3/shared/store-air-universal';
import { MOCK_AIRLINE } from '@fulls1z3/shared/store-air-universal/testing';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { getState, MockStore, StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { configureTestSuite } from 'ng-bullet';

import { SharedModule } from '../../shared';

import { AirlineHeaderComponent } from './airline-header/airline-header.component';
import { AirlineTableComponent } from './airline-table/airline-table.component';
import { AirlineComponent } from './airline.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      FlexModule,
      ReactiveFormsModule,
      RouterTestingModule,
      MaterialModule,
      CoreTestingModule,
      I18NTestingModule,
      StoreTestingModule,
      MaterialModule,
      SharedModule
    ],
    declarations: [AirlineHeaderComponent, AirlineTableComponent, AirlineComponent]
  });
});

describe('AirlineComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AirlineComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });

  test('should `getMany` from AirlineSelectors on init', () => {
    const fixture = TestBed.createComponent(AirlineComponent);
    const store$ = TestBed.inject(Store);
    const state = getState<Airline>(AIRLINE, MOCK_AIRLINE);
    (store$ as MockStore<{}>).setState(state);
    fixture.detectChanges();

    const actual = fixture.componentInstance.airlines$;
    const expected = cold('a', { a: [MOCK_AIRLINE] });

    expect(actual).toBeObservable(expected);
  });

  test('should dispatch `airUniversalGetManyAirlines` action on init', () => {
    const fixture = TestBed.createComponent(AirlineComponent);
    const store$ = fixture.debugElement.injector.get(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const action = airlineActions.airUniversalGetManyAirlines();

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
