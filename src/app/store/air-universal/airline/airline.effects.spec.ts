// angular
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';

// libs
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { RouterTestingModule } from '~/app/framework/router/testing';
import { t } from '~/app/framework/testing';
import { MOCK_AIRLINE, MOCK_AIRLINES, MockAirlineService } from './testing';

// app
import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';
import { ERROR__NO_PAYLOAD } from '~/app/shared';

// module
import { airlineActions } from './airline.actions';
import { AirlineEffects } from './airline.effects';
import { AirlineService } from './airline.service';

const testModuleConfig = () => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoreTestingModule,
        NgrxTestingModule,
        RouterTestingModule
      ],
      providers: [
        AirlineEffects,
        {
          provide: AirlineService,
          useClass: MockAirlineService
        }
      ]
    });
};

t.describe('ng-seed/universal', () => {
  t.describe('store', () => {
    t.describe('air-universal', () => {
      t.describe('airline: AirlineEffects', () => {
        t.be(testModuleConfig);

        t.it('should build without a problem',
          t.inject([AirlineEffects], (effects: AirlineEffects) => {
            t.e(effects)
              .toBeTruthy();
          }));

        t.describe('getAll$', () => {
          t.it('should dispatch `airUniversalGetAllAirlinesSuccess` action, on success',
            t.inject([AirlineEffects],
              (effects: AirlineEffects) => {
                const action = airlineActions.airUniversalGetAllAirlines();
                const completion = airlineActions.airUniversalGetAllAirlinesSuccess(MOCK_AIRLINES);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.getAll$) as any)
                  .toBeObservable(expected);
              }));

          t.it('should dispatch `airUniversalGetAllAirlinesFail` action, on fail',
            t.inject([AirlineEffects, AirlineService],
              (effects: AirlineEffects, airline: MockAirlineService) => {
                airline.isFailing = true;

                const action = airlineActions.airUniversalGetAllAirlines();
                const completion = airlineActions.airUniversalGetAllAirlinesFail(ERROR__NO_PAYLOAD.message);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.getAll$) as any)
                  .toBeObservable(expected);
              }));
        });

        t.describe('getOne$', () => {
          t.it('should dispatch `airUniversalGetOneAirlineSuccess` action, on success',
            t.inject([AirlineEffects],
              (effects: AirlineEffects) => {
                const action = airlineActions.airUniversalGetOneAirline(MOCK_AIRLINE._id);
                const completion = airlineActions.airUniversalGetOneAirlineSuccess(MOCK_AIRLINE);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.getOne$) as any)
                  .toBeObservable(expected);
              }));

          t.it('should dispatch `airUniversalGetOneAirlineFail` action, w/o payload',
            t.inject([AirlineEffects],
              (effects: AirlineEffects) => {
                const action = airlineActions.airUniversalGetOneAirline(undefined);
                const completion = airlineActions.airUniversalGetOneAirlineFail(ERROR__NO_PAYLOAD.message);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.getOne$) as any)
                  .toBeObservable(expected);
              }));

          t.it('should dispatch `airUniversalGetOneAirlineFail` action, on fail',
            t.inject([AirlineEffects, AirlineService],
              (effects: AirlineEffects, airline: MockAirlineService) => {
                airline.isFailing = true;

                const action = airlineActions.airUniversalGetOneAirline(MOCK_AIRLINE._id);
                const completion = airlineActions.airUniversalGetOneAirlineFail(ERROR__NO_PAYLOAD.message);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.getOne$) as any)
                  .toBeObservable(expected);
              }));
        });

        t.describe('createOne$', () => {
          t.it('should dispatch `airUniversalCreateOneAirlineSuccess` action, on success',
            t.inject([Router, AirlineEffects],
              (router: Router, effects: AirlineEffects) => {
                const action = airlineActions.airUniversalCreateOneAirline({
                  resource: MOCK_AIRLINE,
                  router,
                  route: undefined
                });
                const completion = airlineActions.airUniversalCreateOneAirlineSuccess(MOCK_AIRLINE);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.createOne$) as any)
                  .toBeObservable(expected);
              }));

          t.it('should dispatch `airUniversalCreateOneAirlineFail` action, on fail',
            t.inject([Router, AirlineEffects, AirlineService],
              (router: Router, effects: AirlineEffects, airline: MockAirlineService) => {
                airline.isFailing = true;

                const action = airlineActions.airUniversalCreateOneAirline({
                  resource: MOCK_AIRLINE,
                  router,
                  route: undefined
                });
                const completion = airlineActions.airUniversalCreateOneAirlineFail({
                  id: EMPTY_UNIQUE_ID,
                  error: ERROR__NO_PAYLOAD.message
                });

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.createOne$) as any)
                  .toBeObservable(expected);
              }));
        });

        t.describe('updateOne$', () => {
          t.it('should dispatch `airUniversalUpdateOneAirlineSuccess` action, on success',
            t.inject([Router, AirlineEffects],
              (router: Router, effects: AirlineEffects) => {
                const action = airlineActions.airUniversalUpdateOneAirline({
                  resource: MOCK_AIRLINE,
                  router,
                  route: undefined
                });
                const completion = airlineActions.airUniversalUpdateOneAirlineSuccess(MOCK_AIRLINE);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.updateOne$) as any)
                  .toBeObservable(expected);
              }));

          t.it('should dispatch `airUniversalUpdateOneAirlineFail` action, w/o payload',
            t.inject([Router, AirlineEffects, AirlineService],
              (router: Router, effects: AirlineEffects) => {
                const action = airlineActions.airUniversalUpdateOneAirline({
                  resource: undefined,
                  router,
                  route: undefined
                });
                const completion = airlineActions.airUniversalUpdateOneAirlineFail({
                  id: EMPTY_UNIQUE_ID,
                  error: ERROR__NO_PAYLOAD.message
                });

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.updateOne$) as any)
                  .toBeObservable(expected);
              }));

          t.it('should dispatch `airUniversalUpdateOneAirlineFail` action, on fail',
            t.inject([Router, AirlineEffects, AirlineService],
              (router: Router, effects: AirlineEffects, airline: MockAirlineService) => {
                airline.isFailing = true;

                const action = airlineActions.airUniversalUpdateOneAirline({
                  resource: MOCK_AIRLINE,
                  router,
                  route: undefined
                });
                const completion = airlineActions.airUniversalUpdateOneAirlineFail({
                  id: MOCK_AIRLINE._id,
                  error: ERROR__NO_PAYLOAD.message
                });

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.updateOne$) as any)
                  .toBeObservable(expected);
              }));
        });

        t.describe('deleteOne$', () => {
          t.it('should dispatch `airUniversalDeleteOneAirlineSuccess` action, on success',
            t.inject([Router, AirlineEffects],
              (router: Router, effects: AirlineEffects) => {
                const action = airlineActions.airUniversalDeleteOneAirline({
                  id: MOCK_AIRLINE._id,
                  router,
                  route: undefined
                });
                const completion = airlineActions.airUniversalDeleteOneAirlineSuccess(MOCK_AIRLINE._id);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.deleteOne$) as any)
                  .toBeObservable(expected);
              }));

          t.it('should dispatch `airUniversalDeleteOneAirlineFail` action, w/o payload',
            t.inject([Router, AirlineEffects, AirlineService],
              (router: Router, effects: AirlineEffects) => {
                const action = airlineActions.airUniversalDeleteOneAirline({
                  id: undefined,
                  router,
                  route: undefined
                });
                const completion = airlineActions.airUniversalDeleteOneAirlineFail({
                  id: undefined,
                  error: ERROR__NO_PAYLOAD.message
                });

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.deleteOne$) as any)
                  .toBeObservable(expected);
              }));

          t.it('should dispatch `airUniversalDeleteOneAirlineFail` action, on fail',
            t.inject([Router, AirlineEffects, AirlineService],
              (router: Router, effects: AirlineEffects, airline: MockAirlineService) => {
                airline.isFailing = true;

                const action = airlineActions.airUniversalDeleteOneAirline({
                  id: MOCK_AIRLINE._id,
                  router,
                  route: undefined
                });
                const completion = airlineActions.airUniversalDeleteOneAirlineFail({
                  id: MOCK_AIRLINE._id,
                  error: ERROR__NO_PAYLOAD.message
                });

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.deleteOne$) as any)
                  .toBeObservable(expected);
              }));
        });
      });
    });
  });
});
