import { EMPTY_UNIQUE_ID, entityReducer } from '~/app/framework/ngrx';
import { t } from '~/app/framework/testing';
import { ERROR__NO_PAYLOAD } from '~/app/shared';

import { airlineActions } from './airline.actions';
import { reducer } from './airline.reducer';
import { initialState } from './airline.state';
import { MOCK_AIRLINE, MOCK_AIRLINES } from './testing';

t.describe('airline: airline.reducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const res = reducer(undefined, action);

    t.e(res).toEqual(initialState);
  });

  t.describe('airUniversalGetManyAirlines', () => {
    t.it('should return the `isProcessing` on the state', () => {
      const action = airlineActions.airUniversalGetManyAirlines();
      const res = reducer(initialState, action);

      t.e(res.isProcessing).toBeTruthy();
    });
  });

  t.describe('airUniversalGetManyAirlinesSuccess', () => {
    t.it('should return the `ids & entities` on the state', () => {
      const action = airlineActions.airUniversalGetManyAirlinesSuccess(MOCK_AIRLINES);
      const res = reducer(initialState, action);

      const ids = MOCK_AIRLINES.map(cur => cur._id);
      const entities = MOCK_AIRLINES.reduce(entityReducer, undefined);

      t.e(res.ids).toEqual(ids);
      t.e(res.entities).toEqual(entities);
      t.e(res.isProcessing).toBeFalsy();
    });
  });

  t.describe('airUniversalGetManyAirlinesFail', () => {
    t.it('should return the `error` on the state', () => {
      const action = airlineActions.airUniversalGetManyAirlinesFail(ERROR__NO_PAYLOAD.message);
      const res = reducer(initialState, action);

      t.e(res.isProcessing).toBeFalsy();
      t.e(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });

  t.describe('airUniversalGetOneAirline', () => {
    t.it('should return the `isProcessing` on the state', () => {
      const action = airlineActions.airUniversalGetOneAirline(MOCK_AIRLINE._id);
      const res = reducer(initialState, action);

      t.e(res.isProcessing).toBeTruthy();
    });
  });

  t.describe('airUniversalGetOneAirlineSuccess', () => {
    t.it('should return the `selectedId` on the state', () => {
      const action = airlineActions.airUniversalGetOneAirlineSuccess(MOCK_AIRLINE);
      const res = reducer(initialState, action);

      t.e(res.selectedId).toEqual(MOCK_AIRLINE._id);
      t.e(res.isProcessing).toBeFalsy();
    });
  });

  t.describe('airUniversalGetOneAirlineFail', () => {
    t.it('should return the `error` on the state', () => {
      const action = airlineActions.airUniversalGetOneAirlineFail(ERROR__NO_PAYLOAD.message);
      const res = reducer(initialState, action);

      t.e(res.isProcessing).toBeFalsy();
      t.e(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });

  t.describe('airUniversalAddOneAirline', () => {
    t.it('should return the `selectedId` on the state', () => {
      const action = airlineActions.airUniversalAddOneAirline();
      const res = reducer(initialState, action);

      t.e(res.selectedId).toEqual(EMPTY_UNIQUE_ID);
    });
  });

  t.describe('airUniversalCreateOneAirline', () => {
    t.it('should return the `isProcessing` on the state', () => {
      const action = airlineActions.airUniversalCreateOneAirline({
        resource: MOCK_AIRLINE,
        router: undefined,
        route: []
      });
      const res = reducer(initialState, action);

      t.e(res.isProcessing).toBeTruthy();
    });
  });

  t.describe('airUniversalCreateOneAirlineSuccess', () => {
    t.it('should return the `ids & entities` on the state', () => {
      const add = airlineActions.airUniversalAddOneAirline();
      const addState = reducer(initialState, add);
      const action = airlineActions.airUniversalCreateOneAirlineSuccess(MOCK_AIRLINE);
      const res = reducer(addState, action);

      const ids = [MOCK_AIRLINE._id];
      const entities = { [MOCK_AIRLINE._id]: MOCK_AIRLINE };

      t.e(res.ids).toEqual(ids);
      t.e(res.entities).toEqual(entities);
      t.e(res.isProcessing).toBeFalsy();
    });
  });

  t.describe('airUniversalCreateOneAirlineFail', () => {
    t.it('should return the `error` on the state', () => {
      const action = airlineActions.airUniversalCreateOneAirlineFail({
        id: EMPTY_UNIQUE_ID,
        error: ERROR__NO_PAYLOAD.message
      });
      const res = reducer(initialState, action);

      t.e(res.isProcessing).toBeFalsy();
      t.e(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });

  t.describe('airUniversalUpdateOneAirline', () => {
    t.it('should return the `isProcessing` on the state', () => {
      const action = airlineActions.airUniversalUpdateOneAirline({
        resource: MOCK_AIRLINE,
        router: undefined,
        route: []
      });
      const res = reducer(initialState, action);

      t.e(res.isProcessing).toBeTruthy();
    });
  });

  t.describe('airUniversalUpdateOneAirlineSuccess', () => {
    t.it('should return the `ids & entities` on the state', () => {
      const add = airlineActions.airUniversalAddOneAirline();
      const addState = reducer(initialState, add);
      const create = airlineActions.airUniversalCreateOneAirlineSuccess(MOCK_AIRLINE);
      const createState = reducer(addState, create);
      const action = airlineActions.airUniversalUpdateOneAirlineSuccess(MOCK_AIRLINE);
      const res = reducer(createState, action);

      const ids = [MOCK_AIRLINE._id];
      const entities = { [MOCK_AIRLINE._id]: MOCK_AIRLINE };

      t.e(res.ids).toEqual(ids);
      t.e(res.entities).toEqual(entities);
      t.e(res.isProcessing).toBeFalsy();
    });
  });

  t.describe('airUniversalUpdateOneAirlineFail', () => {
    t.it('should return the `error` on the state', () => {
      const action = airlineActions.airUniversalUpdateOneAirlineFail({
        id: EMPTY_UNIQUE_ID,
        error: ERROR__NO_PAYLOAD.message
      });
      const res = reducer(initialState, action);

      t.e(res.isProcessing).toBeFalsy();
      t.e(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });

  t.describe('airUniversalDeleteOneAirline', () => {
    t.it('should return the `isProcessing` on the state', () => {
      const action = airlineActions.airUniversalDeleteOneAirline({
        id: MOCK_AIRLINE._id,
        router: undefined,
        route: []
      });
      const res = reducer(initialState, action);

      t.e(res.isProcessing).toBeTruthy();
    });
  });

  t.describe('airUniversalDeleteOneAirlineSuccess', () => {
    t.it('should return the `ids & entities` on the state', () => {
      const add = airlineActions.airUniversalAddOneAirline();
      const addState = reducer(initialState, add);
      const create = airlineActions.airUniversalCreateOneAirlineSuccess(MOCK_AIRLINE);
      const createState = reducer(addState, create);
      const action = airlineActions.airUniversalDeleteOneAirlineSuccess(MOCK_AIRLINE._id);
      const res = reducer(createState, action);

      t.e(res.ids).toEqual([]);
      t.e(res.entities).toEqual({});
      t.e(res.isProcessing).toBeFalsy();
    });
  });

  t.describe('airUniversalDeleteOneAirlineFail', () => {
    t.it('should return the `error` on the state', () => {
      const action = airlineActions.airUniversalDeleteOneAirlineFail({
        id: EMPTY_UNIQUE_ID,
        error: ERROR__NO_PAYLOAD.message
      });
      const res = reducer(initialState, action);

      t.e(res.isProcessing).toBeFalsy();
      t.e(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });
});
