// angular
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';

// libs
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';

// framework
import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { RouterTestingModule } from '~/app/framework/router/testing';
import { t } from '~/app/framework/testing';
import { MOCK_AIRLINE, MOCK_AIRLINES, MockAirlineService } from './testing';

// shared
import { ERR__NO_PAYLOAD } from '~/app/shared';

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
    t.describe('air-universal: AirlineEffects', () => {
      t.be(testModuleConfig);

      t.it('should build without a problem',
        t.inject([AirlineEffects], (effects: AirlineEffects) => {
          t.e(effects)
            .toBeTruthy();
        }));

      t.describe('getMany$', () => {
        t.it('should dispatch `getAllAirlinesSuccess` action, on success',
          t.inject([AirlineEffects],
            (effects: AirlineEffects) => {
              const action = airlineActions.getAllAirlines();
              const completion = airlineActions.getAllAirlinesSuccess(MOCK_AIRLINES);

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.getAll$) as any)
                .toBeObservable(expected);
            }));

        t.it('should dispatch `getAllAirlinesFail` action, on fail',
          t.inject([AirlineEffects, AirlineService],
            (effects: AirlineEffects, airline: MockAirlineService) => {
              airline.isFailing = true;

              const action = airlineActions.getAllAirlines();
              const completion = airlineActions.getAllAirlinesFail(ERR__NO_PAYLOAD.message);

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.getAll$) as any)
                .toBeObservable(expected);
            }));
      });

      t.describe('getOne$', () => {
        t.it('should dispatch `getOneAirlineSuccess` action, on success',
          t.inject([AirlineEffects],
            (effects: AirlineEffects) => {
              const action = airlineActions.getOneAirline(MOCK_AIRLINE._id);
              const completion = airlineActions.getOneAirlineSuccess(MOCK_AIRLINE);

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.getOne$) as any)
                .toBeObservable(expected);
            }));

        t.it('should dispatch `getOneAirlineFail` action, w/o payload',
          t.inject([AirlineEffects],
            (effects: AirlineEffects) => {
              const action = airlineActions.getOneAirline(undefined);
              const completion = airlineActions.getOneAirlineFail(ERR__NO_PAYLOAD.message);

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.getOne$) as any)
                .toBeObservable(expected);
            }));

        t.it('should dispatch `getOneAirlineFail` action, on fail',
          t.inject([AirlineEffects, AirlineService],
            (effects: AirlineEffects, airline: MockAirlineService) => {
              airline.isFailing = true;

              const action = airlineActions.getOneAirline(MOCK_AIRLINE._id);
              const completion = airlineActions.getOneAirlineFail(ERR__NO_PAYLOAD.message);

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.getOne$) as any)
                .toBeObservable(expected);
            }));
      });

      t.describe('createOne$', () => {
        t.it('should dispatch `createOneAirlineSuccess` action, on success',
          t.inject([Router, AirlineEffects],
            (router: Router, effects: AirlineEffects) => {
              const action = airlineActions.createOneAirline({
                resource: MOCK_AIRLINE,
                router,
                route: undefined
              });
              const completion = airlineActions.createOneAirlineSuccess(MOCK_AIRLINE);

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.createOne$) as any)
                .toBeObservable(expected);
            }));

        t.it('should dispatch `createOneAirlineFail` action, on fail',
          t.inject([Router, AirlineEffects, AirlineService],
            (router: Router, effects: AirlineEffects, airline: MockAirlineService) => {
              airline.isFailing = true;

              const action = airlineActions.createOneAirline({
                resource: MOCK_AIRLINE,
                router,
                route: undefined
              });
              const completion = airlineActions.createOneAirlineFail({
                id: EMPTY_UNIQUE_ID,
                error: ERR__NO_PAYLOAD.message
              });

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.createOne$) as any)
                .toBeObservable(expected);
            }));
      });

      t.describe('updateOne$', () => {
        t.it('should dispatch `updateOneAirlineSuccess` action, on success',
          t.inject([Router, AirlineEffects],
            (router: Router, effects: AirlineEffects) => {
              const action = airlineActions.updateOneAirline({
                resource: MOCK_AIRLINE,
                router,
                route: undefined
              });
              const completion = airlineActions.updateOneAirlineSuccess(MOCK_AIRLINE);

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.updateOne$) as any)
                .toBeObservable(expected);
            }));

        t.it('should dispatch `updateOneAirlineFail` action, w/o payload',
          t.inject([Router, AirlineEffects, AirlineService],
            (router: Router, effects: AirlineEffects) => {
              const action = airlineActions.updateOneAirline({
                resource: undefined,
                router,
                route: undefined
              });
              const completion = airlineActions.updateOneAirlineFail({
                id: EMPTY_UNIQUE_ID,
                error: ERR__NO_PAYLOAD.message
              });

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.updateOne$) as any)
                .toBeObservable(expected);
            }));

        t.it('should dispatch `updateOneAirlineFail` action, on fail',
          t.inject([Router, AirlineEffects, AirlineService],
            (router: Router, effects: AirlineEffects, airline: MockAirlineService) => {
              airline.isFailing = true;

              const action = airlineActions.updateOneAirline({
                resource: MOCK_AIRLINE,
                router,
                route: undefined
              });
              const completion = airlineActions.updateOneAirlineFail({
                id: MOCK_AIRLINE._id,
                error: ERR__NO_PAYLOAD.message
              });

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.updateOne$) as any)
                .toBeObservable(expected);
            }));
      });

      t.describe('deleteOne$', () => {
        t.it('should dispatch `deleteOneAirlineSuccess` action, on success',
          t.inject([Router, AirlineEffects],
            (router: Router, effects: AirlineEffects) => {
              const action = airlineActions.deleteOneAirline({
                id: MOCK_AIRLINE._id,
                router,
                route: undefined
              });
              const completion = airlineActions.deleteOneAirlineSuccess(MOCK_AIRLINE._id);

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.deleteOne$) as any)
                .toBeObservable(expected);
            }));

        t.it('should dispatch `deleteOneAirlineFail` action, w/o payload',
          t.inject([Router, AirlineEffects, AirlineService],
            (router: Router, effects: AirlineEffects) => {
              const action = airlineActions.deleteOneAirline({
                id: undefined,
                router,
                route: undefined
              });
              const completion = airlineActions.deleteOneAirlineFail({
                id: undefined,
                error: ERR__NO_PAYLOAD.message
              });

              const actions$ = TestBed.get(Actions);
              actions$.stream = hot('-a', {a: action});
              const expected = cold('-c', {c: completion});

              (t.e(effects.deleteOne$) as any)
                .toBeObservable(expected);
            }));

        t.it('should dispatch `deleteOneAirlineFail` action, on fail',
          t.inject([Router, AirlineEffects, AirlineService],
            (router: Router, effects: AirlineEffects, airline: MockAirlineService) => {
              airline.isFailing = true;

              const action = airlineActions.deleteOneAirline({
                id: MOCK_AIRLINE._id,
                router,
                route: undefined
              });
              const completion = airlineActions.deleteOneAirlineFail({
                id: MOCK_AIRLINE._id,
                error: ERR__NO_PAYLOAD.message
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
