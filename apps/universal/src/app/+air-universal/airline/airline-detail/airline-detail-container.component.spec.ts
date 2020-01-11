import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AIRLINE, Airline, airlineActions } from '@fulls1z3/shared/store-air-universal';
import { MOCK_AIRLINE } from '@fulls1z3/shared/store-air-universal/testing';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { EMPTY_UNIQUE_ID } from '@fulls1z3/shared/util-store';
import { getState, StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { flow } from 'lodash/fp';
import { of as observableOf } from 'rxjs';

import { RenderFlag, SharedModule } from '../../../shared';
import { CardModule } from '../../../shared/card';
import { FalsyModule } from '../../../shared/falsy';

import { AirlineDetailContainerComponent } from './airline-detail-container.component';
import { AirlineDetailComponent } from './airline-detail.component';

const testModuleConfig = (renderFlag = RenderFlag.Create) => {
  TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      RouterTestingModule,
      CoreTestingModule,
      I18NTestingModule,
      StoreTestingModule,
      MaterialModule,
      SharedModule,
      CardModule,
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
    declarations: [AirlineDetailContainerComponent, AirlineDetailComponent]
  });
};

describe('AirlineDetailContainerComponent', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });

  test('should `getSelected` from AirlineSelectors on init', () => {
    const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
    const store$ = TestBed.get(Store);
    const state = getState<Airline>(AIRLINE, MOCK_AIRLINE);
    store$.setState(state);
    fixture.detectChanges();

    const actual = fixture.componentInstance.airline$;
    const expected = cold('a', { a: MOCK_AIRLINE });

    expect(actual).toBeObservable(expected);
  });

  test('should dispatch `airUniversalAddOneAirline` action on init', () => {
    const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
    const store$ = TestBed.get(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const action = airlineActions.airUniversalAddOneAirline();

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should dispatch `airUniversalCreateOneAirline` action on save', () => {
    const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
    const store$ = TestBed.get(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const saveClick = flow(
      (cur: ComponentFixture<AirlineDetailContainerComponent>) => cur.debugElement.query(By.directive(AirlineDetailComponent)),
      cur => cur.componentInstance,
      cur => cur.saveClick
    )(fixture);
    const resource = { id: EMPTY_UNIQUE_ID, ...MOCK_AIRLINE };
    saveClick.emit(MOCK_AIRLINE);

    const router = fixture.debugElement.injector.get(Router);
    const instance = fixture.componentInstance;
    const action = airlineActions.airUniversalCreateOneAirline({
      resource,
      router,
      route: instance.baseRoute
    });

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

describe('AirlineDetailContainerComponent for renderFlag=`Update`', () => {
  beforeEach(() => {
    testModuleConfig(RenderFlag.Update);
  });

  test('should dispatch `airUniversalGetOneAirline` action on init', () => {
    const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
    const store$ = TestBed.get(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const action = airlineActions.airUniversalGetOneAirline(MOCK_AIRLINE.id);

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should dispatch `airUniversalUpdateOneAirline` action on save', () => {
    const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
    const store$ = TestBed.get(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const saveClick = flow(
      (cur: ComponentFixture<AirlineDetailContainerComponent>) => cur.debugElement.query(By.directive(AirlineDetailComponent)),
      cur => cur.componentInstance,
      cur => cur.saveClick
    )(fixture);
    saveClick.emit(MOCK_AIRLINE);

    const router = fixture.debugElement.injector.get(Router);
    const instance = fixture.componentInstance;
    const action = airlineActions.airUniversalUpdateOneAirline({
      resource: MOCK_AIRLINE,
      router,
      route: instance.baseRoute
    });

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('should dispatch `airUniversalDeleteOneAirline` action on delete', () => {
    const fixture = TestBed.createComponent(AirlineDetailContainerComponent);
    const store$ = TestBed.get(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const deleteClick = flow(
      (cur: ComponentFixture<AirlineDetailContainerComponent>) => cur.debugElement.query(By.directive(AirlineDetailComponent)),
      cur => cur.componentInstance,
      cur => cur.deleteClick
    )(fixture);
    deleteClick.emit(MOCK_AIRLINE.id);

    const router = fixture.debugElement.injector.get(Router);
    const instance = fixture.componentInstance;
    const action = airlineActions.airUniversalDeleteOneAirline({
      id: MOCK_AIRLINE.id,
      router,
      route: instance.baseRoute
    });

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
