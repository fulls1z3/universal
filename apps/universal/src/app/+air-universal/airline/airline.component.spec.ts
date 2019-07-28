import { inject, TestBed } from '@angular/core/testing';
import { FlexModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { configureTestSuite } from 'ng-bullet';

import { CoreTestingModule } from '../../framework/core/testing';
import { I18NTestingModule } from '../../framework/i18n/testing';
import { MaterialModule } from '../../framework/material';
import { getState, NgrxTestingModule } from '../../framework/ngrx/testing';
import { RouterTestingModule } from '../../framework/router/testing';
import { SharedModule } from '../../shared';
import { DataTableModule } from '../../shared/data-table';
import { AIRLINE, Airline, airlineActions } from '../../store';
import { MOCK_AIRLINE } from '../../store/testing';

import { AirlineComponent } from './airline.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      FlexModule,
      CoreTestingModule,
      I18NTestingModule,
      NgrxTestingModule,
      MaterialModule,
      DataTableModule,
      SharedModule
    ],
    declarations: [AirlineComponent]
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
    const store$ = TestBed.get(Store);
    const state = getState<Airline>(AIRLINE, MOCK_AIRLINE);
    store$.setState(state);
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

  test(
    'should navigate to `create` on create button click',
    inject([Router], (router: Router) => {
      const fixture = TestBed.createComponent(AirlineComponent);
      const instance = fixture.componentInstance;
      const spy = spyOn(router, 'navigate');
      fixture.detectChanges();

      const menu = fixture.debugElement.query(By.css('.qa-menu'));
      menu.triggerEventHandler('click', {});
      const createButton = fixture.debugElement.query(By.css('.qa-menu_item__create'));
      createButton.triggerEventHandler('click', {});

      expect(spy).toHaveBeenCalledWith([...instance.baseRoute, 'create']);
      expect(spy).toHaveBeenCalledTimes(1);
    })
  );

  test('should dispatch `airUniversalGetManyAirlines` action on refresh button click', () => {
    const fixture = TestBed.createComponent(AirlineComponent);
    const store$ = fixture.debugElement.injector.get(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const refreshButton = fixture.debugElement.query(By.css('button.qa-toolbar__refresh'));
    refreshButton.triggerEventHandler('click', {});

    const action = airlineActions.airUniversalGetManyAirlines();

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
