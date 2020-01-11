import { EMPTY_UNIQUE_ID, entityReducer, ERROR__NO_PAYLOAD } from '@fulls1z3/shared/util-store';

import { airlineActions } from './airline.actions';
import { reducer } from './airline.reducer';
import { initialState } from './airline.state';
import { MOCK_AIRLINE, MOCK_AIRLINES } from './testing/common';

describe('reducer', () => {
  test('should return the initial state', () => {
    const action = {} as any;
    const actual = reducer(undefined, action);

    expect(actual).toEqual(initialState);
  });

  describe('airUniversalGetManyAirlines', () => {
    test('should return the `isProcessing` on the state', () => {
      const action = airlineActions.airUniversalGetManyAirlines();
      const res = reducer(initialState, action);

      expect(res.isProcessing).toBeTruthy();
    });
  });

  describe('airUniversalGetManyAirlinesSuccess', () => {
    test('should return the `ids & entities` on the state', () => {
      const action = airlineActions.airUniversalGetManyAirlinesSuccess(MOCK_AIRLINES);
      const res = reducer(initialState, action);

      const ids = MOCK_AIRLINES.map(cur => cur.id);
      const entities = MOCK_AIRLINES.reduce(entityReducer, undefined);

      expect(res.ids).toEqual(ids);
      expect(res.entities).toEqual(entities);
    });
  });

  describe('airUniversalGetManyAirlinesFail', () => {
    test('should return the `error` on the state', () => {
      const action = airlineActions.airUniversalGetManyAirlinesFail(ERROR__NO_PAYLOAD.message);
      const res = reducer(initialState, action);

      expect(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });

  describe('airUniversalGetOneAirline', () => {
    test('should return the `isProcessing` on the state', () => {
      const action = airlineActions.airUniversalGetOneAirline(MOCK_AIRLINE.id);
      const res = reducer(initialState, action);

      expect(res.isProcessing).toBeTruthy();
    });
  });

  describe('airUniversalGetOneAirlineSuccess', () => {
    test('should return the `selectedId` on the state', () => {
      const action = airlineActions.airUniversalGetOneAirlineSuccess(MOCK_AIRLINE);
      const res = reducer(initialState, action);

      expect(res.selectedId).toEqual(MOCK_AIRLINE.id);
    });
  });

  describe('airUniversalGetOneAirlineFail', () => {
    test('should return the `error` on the state', () => {
      const action = airlineActions.airUniversalGetOneAirlineFail(ERROR__NO_PAYLOAD.message);
      const res = reducer(initialState, action);

      expect(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });

  describe('airUniversalAddOneAirline', () => {
    test('should return the `selectedId` on the state', () => {
      const action = airlineActions.airUniversalAddOneAirline();
      const res = reducer(initialState, action);

      expect(res.selectedId).toEqual(EMPTY_UNIQUE_ID);
    });
  });

  describe('airUniversalCreateOneAirline', () => {
    test('should return the `isProcessing` on the state', () => {
      const action = airlineActions.airUniversalCreateOneAirline({
        resource: MOCK_AIRLINE,
        router: undefined,
        route: []
      });
      const res = reducer(initialState, action);

      expect(res.isProcessing).toBeTruthy();
    });
  });

  describe('airUniversalCreateOneAirlineSuccess', () => {
    test('should return the `ids & entities` on the state', () => {
      const add = airlineActions.airUniversalAddOneAirline();
      const addState = reducer(initialState, add);
      const action = airlineActions.airUniversalCreateOneAirlineSuccess(MOCK_AIRLINE);
      const res = reducer(addState, action);

      const ids = [MOCK_AIRLINE.id];
      const entities = { [MOCK_AIRLINE.id]: MOCK_AIRLINE };

      expect(res.ids).toEqual(ids);
      expect(res.entities).toEqual(entities);
    });
  });

  describe('airUniversalCreateOneAirlineFail', () => {
    test('should return the `error` on the state', () => {
      const action = airlineActions.airUniversalCreateOneAirlineFail({
        id: EMPTY_UNIQUE_ID,
        error: ERROR__NO_PAYLOAD.message
      });
      const res = reducer(initialState, action);

      expect(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });

  describe('airUniversalUpdateOneAirline', () => {
    test('should return the `isProcessing` on the state', () => {
      const action = airlineActions.airUniversalUpdateOneAirline({
        resource: MOCK_AIRLINE,
        router: undefined,
        route: []
      });
      const res = reducer(initialState, action);

      expect(res.isProcessing).toBeTruthy();
    });
  });

  describe('airUniversalUpdateOneAirlineSuccess', () => {
    test('should return the `ids & entities` on the state', () => {
      const add = airlineActions.airUniversalAddOneAirline();
      const addState = reducer(initialState, add);
      const create = airlineActions.airUniversalCreateOneAirlineSuccess(MOCK_AIRLINE);
      const createState = reducer(addState, create);
      const action = airlineActions.airUniversalUpdateOneAirlineSuccess(MOCK_AIRLINE);
      const res = reducer(createState, action);

      const ids = [MOCK_AIRLINE.id];
      const entities = { [MOCK_AIRLINE.id]: MOCK_AIRLINE };

      expect(res.ids).toEqual(ids);
      expect(res.entities).toEqual(entities);
    });
  });

  describe('airUniversalUpdateOneAirlineFail', () => {
    test('should return the `error` on the state', () => {
      const action = airlineActions.airUniversalUpdateOneAirlineFail({
        id: EMPTY_UNIQUE_ID,
        error: ERROR__NO_PAYLOAD.message
      });
      const res = reducer(initialState, action);

      expect(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });

  describe('airUniversalDeleteOneAirline', () => {
    test('should return the `isProcessing` on the state', () => {
      const action = airlineActions.airUniversalDeleteOneAirline({
        id: MOCK_AIRLINE.id,
        router: undefined,
        route: []
      });
      const res = reducer(initialState, action);

      expect(res.isProcessing).toBeTruthy();
    });
  });

  describe('airUniversalDeleteOneAirlineSuccess', () => {
    test('should return the `ids & entities` on the state', () => {
      const add = airlineActions.airUniversalAddOneAirline();
      const addState = reducer(initialState, add);
      const create = airlineActions.airUniversalCreateOneAirlineSuccess(MOCK_AIRLINE);
      const createState = reducer(addState, create);
      const action = airlineActions.airUniversalDeleteOneAirlineSuccess(MOCK_AIRLINE.id);
      const res = reducer(createState, action);

      expect(res.ids).toEqual([]);
      expect(res.entities).toEqual({});
    });
  });

  describe('airUniversalDeleteOneAirlineFail', () => {
    test('should return the `error` on the state', () => {
      const action = airlineActions.airUniversalDeleteOneAirlineFail({
        id: EMPTY_UNIQUE_ID,
        error: ERROR__NO_PAYLOAD.message
      });
      const res = reducer(initialState, action);

      expect(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });
});
