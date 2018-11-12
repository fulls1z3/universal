// framework
import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';

// testing
import { t } from '~/app/framework/testing';
import { MOCK_AIRLINE, MOCK_AIRLINES } from './testing';

// shared
import { ERROR__NO_PAYLOAD } from '~/app/shared';

// module
import { airlineActions } from './airline.actions';
import { reducer } from './airline.reducer';
import { initialState } from './airline.state';

t.describe('ng-seed/universal', () => {
  t.describe('store', () => {
    t.describe('air-universal: airline reducer', () => {
      it('should return the initial state', () => {
        const action = {} as any;
        const res = reducer(undefined, action);

        t.e(res)
          .toBe(initialState);
      });

      t.describe('airUniversalGetAllAirlines', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.airUniversalGetAllAirlines(MOCK_AIRLINE._id);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(true);
        });
      });

      t.describe('airUniversalGetAllAirlinesSuccess', () => {
        t.it('should return the `ids & entities` on the state', () => {
          const action = airlineActions.airUniversalGetAllAirlinesSuccess(MOCK_AIRLINES);
          const res = reducer(initialState, action);

          const ids = MOCK_AIRLINES
            .map(cur => cur._id);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.ids)
            .toEqual(ids);
        });
      });

      t.describe('airUniversalGetAllAirlinesFail', () => {
        t.it('should return the `error` on the state', () => {
          const action = airlineActions.airUniversalGetAllAirlinesFail(ERROR__NO_PAYLOAD.message);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.error)
            .toEqual(ERROR__NO_PAYLOAD.message);
        });
      });

      t.describe('airUniversalGetOneAirline', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.airUniversalGetOneAirline(MOCK_AIRLINE._id);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(true);
        });
      });

      t.describe('airUniversalGetOneAirlineSuccess', () => {
        t.it('should return the `selectedId` on the state', () => {
          const action = airlineActions.airUniversalGetOneAirlineSuccess(MOCK_AIRLINE);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.selectedId)
            .toEqual(MOCK_AIRLINE._id);
        });
      });

      t.describe('airUniversalGetOneAirlineFail', () => {
        t.it('should return the `error` on the state', () => {
          const action = airlineActions.airUniversalGetOneAirlineFail(ERROR__NO_PAYLOAD.message);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.error)
            .toEqual(ERROR__NO_PAYLOAD.message);
        });
      });

      t.describe('airUniversalAddOneAirline', () => {
        t.it('should return the `selectedId` on the state', () => {
          const action = airlineActions.airUniversalAddOneAirline();
          const res = reducer(initialState, action);

          t.e(res.selectedId)
            .toEqual(EMPTY_UNIQUE_ID);
        });
      });

      t.describe('airUniversalCreateOneAirline', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.airUniversalCreateOneAirline({resource: MOCK_AIRLINE, router: undefined, route: undefined});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(true);
        });
      });

      t.describe('airUniversalCreateOneAirlineSuccess', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.airUniversalCreateOneAirlineSuccess(MOCK_AIRLINE);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
        });
      });

      t.describe('airUniversalCreateOneAirlineFail', () => {
        t.it('should return the `error` on the state', () => {
          const action = airlineActions.airUniversalCreateOneAirlineFail({id: EMPTY_UNIQUE_ID, error: ERROR__NO_PAYLOAD.message});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.error)
            .toEqual(ERROR__NO_PAYLOAD.message);
        });
      });

      t.describe('airUniversalUpdateOneAirline', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.airUniversalUpdateOneAirline({resource: MOCK_AIRLINE, router: undefined, route: undefined});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(true);
        });
      });

      t.describe('airUniversalUpdateOneAirlineSuccess', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.airUniversalUpdateOneAirlineSuccess(MOCK_AIRLINE);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
        });
      });

      t.describe('airUniversalUpdateOneAirlineFail', () => {
        t.it('should return the `error` on the state', () => {
          const action = airlineActions.airUniversalUpdateOneAirlineFail({id: EMPTY_UNIQUE_ID, error: ERROR__NO_PAYLOAD.message});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.error)
            .toEqual(ERROR__NO_PAYLOAD.message);
        });
      });

      t.describe('airUniversalDeleteOneAirline', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.airUniversalDeleteOneAirline({id: MOCK_AIRLINE._id, router: undefined, route: undefined});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(true);
        });
      });

      t.describe('airUniversalDeleteOneAirlineSuccess', () => {
        t.it('should return the `ids & entities` on the state', () => {
          const action = airlineActions.airUniversalDeleteOneAirlineSuccess(MOCK_AIRLINE._id);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.ids)
            .toEqual([]);
        });
      });

      t.describe('airUniversalDeleteOneAirlineFail', () => {
        t.it('should return the `error` on the state', () => {
          const action = airlineActions.airUniversalDeleteOneAirlineFail({id: EMPTY_UNIQUE_ID, error: ERROR__NO_PAYLOAD.message});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.error)
            .toEqual(ERROR__NO_PAYLOAD.message);
        });
      });
    });
  });
});
