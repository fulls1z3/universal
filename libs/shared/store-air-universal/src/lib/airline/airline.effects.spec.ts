import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { EMPTY_UNIQUE_ID, ERROR__NO_PAYLOAD } from '@fulls1z3/shared/util-store';
import { StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { airlineActions } from './airline.actions';
import { AirlineEffects } from './airline.effects';
import { AirlineService } from './airline.service';
import { MOCK_AIRLINE, MOCK_AIRLINES } from './testing/common';
import { MockAirlineService } from './testing/mocks/airline-service.mock';

let actions$: Observable<any>;

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, CoreTestingModule, StoreTestingModule, RouterTestingModule],
    providers: [
      AirlineEffects,
      provideMockActions(() => actions$),
      {
        provide: AirlineService,
        useClass: MockAirlineService,
      },
    ],
  });

  actions$ = TestBed.inject(Actions);
};

describe('AirlineEffects', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should build without a problem', inject([AirlineEffects], (effects: AirlineEffects) => {
    expect(effects).toBeTruthy();
  }));

  describe('getMany$', () => {
    test('should dispatch `airUniversalGetManyAirlinesSuccess` action, on success', inject([AirlineEffects], (effects: AirlineEffects) => {
      const action = airlineActions.airUniversalGetManyAirlines();
      const completion = airlineActions.airUniversalGetManyAirlinesSuccess(MOCK_AIRLINES);

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.getMany$).toBeObservable(expected);
    }));

    test('should dispatch `airUniversalGetManyAirlinesFail` action, on fail', inject(
      [AirlineEffects, AirlineService],
      (effects: AirlineEffects, airline: MockAirlineService) => {
        airline.isFailing = true;

        const action = airlineActions.airUniversalGetManyAirlines();
        const completion = airlineActions.airUniversalGetManyAirlinesFail(ERROR__NO_PAYLOAD.message);

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.getMany$).toBeObservable(expected);
      }
    ));
  });

  describe('getOne$', () => {
    test('should dispatch `airUniversalGetOneAirlineSuccess` action, on success', inject([AirlineEffects], (effects: AirlineEffects) => {
      const action = airlineActions.airUniversalGetOneAirline(MOCK_AIRLINE.id);
      const completion = airlineActions.airUniversalGetOneAirlineSuccess(MOCK_AIRLINE);

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.getOne$).toBeObservable(expected);
    }));

    test('should dispatch `airUniversalGetOneAirlineFail` action, w/o payload', inject([AirlineEffects], (effects: AirlineEffects) => {
      const action = airlineActions.airUniversalGetOneAirline(undefined);
      const completion = airlineActions.airUniversalGetOneAirlineFail(ERROR__NO_PAYLOAD.message);

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.getOne$).toBeObservable(expected);
    }));

    test('should dispatch `airUniversalGetOneAirlineFail` action, on fail', inject(
      [AirlineEffects, AirlineService],
      (effects: AirlineEffects, airline: MockAirlineService) => {
        airline.isFailing = true;

        const action = airlineActions.airUniversalGetOneAirline(MOCK_AIRLINE.id);
        const completion = airlineActions.airUniversalGetOneAirlineFail(ERROR__NO_PAYLOAD.message);

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.getOne$).toBeObservable(expected);
      }
    ));
  });

  describe('createOne$', () => {
    test('should dispatch `airUniversalCreateOneAirlineSuccess` action, on success', inject(
      [Router, AirlineEffects],
      (router: Router, effects: AirlineEffects) => {
        const action = airlineActions.airUniversalCreateOneAirline({
          resource: MOCK_AIRLINE,
          router,
          route: [],
        });
        const completion = airlineActions.airUniversalCreateOneAirlineSuccess(MOCK_AIRLINE);

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.createOne$).toBeObservable(expected);
      }
    ));

    test('should dispatch `airUniversalCreateOneAirlineFail` action, w/o payload', inject(
      [Router, AirlineEffects],
      (router: Router, effects: AirlineEffects) => {
        const action = airlineActions.airUniversalCreateOneAirline({
          resource: undefined,
          router,
          route: [],
        });
        const completion = airlineActions.airUniversalCreateOneAirlineFail({
          id: EMPTY_UNIQUE_ID,
          error: ERROR__NO_PAYLOAD.message,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.createOne$).toBeObservable(expected);
      }
    ));

    test('should dispatch `airUniversalCreateOneAirlineFail` action, on fail', inject(
      [Router, AirlineEffects, AirlineService],
      (router: Router, effects: AirlineEffects, airline: MockAirlineService) => {
        airline.isFailing = true;

        const action = airlineActions.airUniversalCreateOneAirline({
          resource: MOCK_AIRLINE,
          router,
          route: [],
        });
        const completion = airlineActions.airUniversalCreateOneAirlineFail({
          id: EMPTY_UNIQUE_ID,
          error: ERROR__NO_PAYLOAD.message,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.createOne$).toBeObservable(expected);
      }
    ));
  });

  describe('updateOne$', () => {
    test('should dispatch `airUniversalUpdateOneAirlineSuccess` action, on success', inject(
      [Router, AirlineEffects],
      (router: Router, effects: AirlineEffects) => {
        const action = airlineActions.airUniversalUpdateOneAirline({
          resource: MOCK_AIRLINE,
          router,
          route: [],
        });
        const completion = airlineActions.airUniversalUpdateOneAirlineSuccess(MOCK_AIRLINE);

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.updateOne$).toBeObservable(expected);
      }
    ));

    test('should dispatch `airUniversalUpdateOneAirlineFail` action, w/o payload', inject(
      [Router, AirlineEffects],
      (router: Router, effects: AirlineEffects) => {
        const action = airlineActions.airUniversalUpdateOneAirline({
          resource: undefined,
          router,
          route: [],
        });
        const completion = airlineActions.airUniversalUpdateOneAirlineFail({
          id: EMPTY_UNIQUE_ID,
          error: ERROR__NO_PAYLOAD.message,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.updateOne$).toBeObservable(expected);
      }
    ));

    test('should dispatch `airUniversalUpdateOneAirlineFail` action, on fail', inject(
      [Router, AirlineEffects, AirlineService],
      (router: Router, effects: AirlineEffects, airline: MockAirlineService) => {
        airline.isFailing = true;

        const action = airlineActions.airUniversalUpdateOneAirline({
          resource: MOCK_AIRLINE,
          router,
          route: [],
        });
        const completion = airlineActions.airUniversalUpdateOneAirlineFail({
          id: MOCK_AIRLINE.id,
          error: ERROR__NO_PAYLOAD.message,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.updateOne$).toBeObservable(expected);
      }
    ));
  });

  describe('deleteOne$', () => {
    test('should dispatch `airUniversalDeleteOneAirlineSuccess` action, on success', inject(
      [Router, AirlineEffects],
      (router: Router, effects: AirlineEffects) => {
        const action = airlineActions.airUniversalDeleteOneAirline({
          id: MOCK_AIRLINE.id,
          router,
          route: [],
        });
        const completion = airlineActions.airUniversalDeleteOneAirlineSuccess(MOCK_AIRLINE.id);

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.deleteOne$).toBeObservable(expected);
      }
    ));

    test('should dispatch `airUniversalDeleteOneAirlineFail` action, w/o payload', inject(
      [Router, AirlineEffects],
      (router: Router, effects: AirlineEffects) => {
        const action = airlineActions.airUniversalDeleteOneAirline({
          id: undefined,
          router,
          route: [],
        });
        const completion = airlineActions.airUniversalDeleteOneAirlineFail({
          id: undefined,
          error: ERROR__NO_PAYLOAD.message,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.deleteOne$).toBeObservable(expected);
      }
    ));

    test('should dispatch `airUniversalDeleteOneAirlineFail` action, on fail', inject(
      [Router, AirlineEffects, AirlineService],
      (router: Router, effects: AirlineEffects, airline: MockAirlineService) => {
        airline.isFailing = true;

        const action = airlineActions.airUniversalDeleteOneAirline({
          id: MOCK_AIRLINE.id,
          router,
          route: [],
        });
        const completion = airlineActions.airUniversalDeleteOneAirlineFail({
          id: MOCK_AIRLINE.id,
          error: ERROR__NO_PAYLOAD.message,
        });

        actions$ = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });

        expect(effects.deleteOne$).toBeObservable(expected);
      }
    ));
  });
});
