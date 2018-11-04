// framework
import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';

// testing
import { t } from '~/app/framework/testing';
import { MOCK_AIRLINE, MOCK_AIRLINES } from './testing';

// shared
import { ERR__NO_PAYLOAD } from '~/app/shared';

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

      t.describe('getAllAirlines', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.getAllAirlines(MOCK_AIRLINE._id);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(true);
        });
      });

      t.describe('getAllAirlinesSuccess', () => {
        t.it('should return the `ids & entities` on the state', () => {
          const action = airlineActions.getAllAirlinesSuccess(MOCK_AIRLINES);
          const res = reducer(initialState, action);

          const ids = MOCK_AIRLINES
            .map(cur => cur._id);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.ids)
            .toEqual(ids);
        });
      });

      t.describe('getAllAirlinesFail', () => {
        t.it('should return the `error` on the state', () => {
          const action = airlineActions.getAllAirlinesFail(ERR__NO_PAYLOAD.message);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.error)
            .toEqual(ERR__NO_PAYLOAD.message);
        });
      });

      t.describe('getOneAirline', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.getOneAirline(MOCK_AIRLINE._id);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(true);
        });
      });

      t.describe('getOneAirlineSuccess', () => {
        t.it('should return the `selectedId` on the state', () => {
          const action = airlineActions.getOneAirlineSuccess(MOCK_AIRLINE);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.selectedId)
            .toEqual(MOCK_AIRLINE._id);
        });
      });

      t.describe('getOneAirlineFail', () => {
        t.it('should return the `error` on the state', () => {
          const action = airlineActions.getOneAirlineFail(ERR__NO_PAYLOAD.message);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.error)
            .toEqual(ERR__NO_PAYLOAD.message);
        });
      });

      t.describe('addOneAirline', () => {
        t.it('should return the `selectedId` on the state', () => {
          const action = airlineActions.addOneAirline();
          const res = reducer(initialState, action);

          t.e(res.selectedId)
            .toEqual(EMPTY_UNIQUE_ID);
        });
      });

      t.describe('createOneAirline', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.createOneAirline({resource: MOCK_AIRLINE, router: undefined, route: undefined});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(true);
        });
      });

      t.describe('createOneAirlineSuccess', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.createOneAirlineSuccess(MOCK_AIRLINE);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
        });
      });

      t.describe('createOneAirlineFail', () => {
        t.it('should return the `error` on the state', () => {
          const action = airlineActions.createOneAirlineFail({id: EMPTY_UNIQUE_ID, error: ERR__NO_PAYLOAD.message});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.error)
            .toEqual(ERR__NO_PAYLOAD.message);
        });
      });

      t.describe('updateOneAirline', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.updateOneAirline({resource: MOCK_AIRLINE, router: undefined, route: undefined});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(true);
        });
      });

      t.describe('updateOneAirlineSuccess', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.updateOneAirlineSuccess(MOCK_AIRLINE);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
        });
      });

      t.describe('updateOneAirlineFail', () => {
        t.it('should return the `error` on the state', () => {
          const action = airlineActions.updateOneAirlineFail({id: EMPTY_UNIQUE_ID, error: ERR__NO_PAYLOAD.message});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.error)
            .toEqual(ERR__NO_PAYLOAD.message);
        });
      });

      t.describe('deleteOneAirline', () => {
        t.it('should return the `isProcessing` on the state', () => {
          const action = airlineActions.deleteOneAirline({id: MOCK_AIRLINE._id, router: undefined, route: undefined});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(true);
        });
      });

      t.describe('deleteOneAirlineSuccess', () => {
        t.it('should return the `ids & entities` on the state', () => {
          const action = airlineActions.deleteOneAirlineSuccess(MOCK_AIRLINE._id);
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.ids)
            .toEqual([]);
        });
      });

      t.describe('deleteOneAirlineFail', () => {
        t.it('should return the `error` on the state', () => {
          const action = airlineActions.deleteOneAirlineFail({id: EMPTY_UNIQUE_ID, error: ERR__NO_PAYLOAD.message});
          const res = reducer(initialState, action);

          t.e(res.isProcessing)
            .toEqual(false);
          t.e(res.error)
            .toEqual(ERR__NO_PAYLOAD.message);
        });
      });
    });
  });
});
