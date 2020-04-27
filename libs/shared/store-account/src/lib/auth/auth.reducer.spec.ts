import { TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { ERROR__NO_PAYLOAD } from '@fulls1z3/shared/util-store';

import { MOCK_AUTH } from '../testing/auth/common';

import { authActions } from './auth.actions';
import { reducer } from './auth.reducer';
import { initialState } from './auth.state';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [CoreTestingModule]
  });
};

describe('reducer', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should return the initial state', () => {
    const action = {} as any;
    const actual = reducer(undefined, action);

    expect(actual).toEqual(initialState);
  });

  describe('accountLogin', () => {
    test('should return the `isProcessing` on the state', () => {
      const action = authActions.accountLogin({
        resource: MOCK_AUTH
      });
      const res = reducer(initialState, action);

      expect(res.isProcessing).toBeTruthy();
    });
  });

  describe('accountLoginSuccess', () => {
    test('should return the `isProcessing` on the state', () => {
      const action = authActions.accountLoginSuccess(true);
      const res = reducer(initialState, action);

      expect(res.isProcessing).toBeFalsy();
    });
  });

  describe('accountLoginFail', () => {
    test('should return the `error` on the state', () => {
      const action = authActions.accountLoginFail(ERROR__NO_PAYLOAD.message);
      const res = reducer(initialState, action);

      expect(res.error).toEqual(ERROR__NO_PAYLOAD.message);
    });
  });

  describe('accountLogout', () => {
    test('should return the `isProcessing` on the state', () => {
      const action = authActions.accountLogout(undefined);
      const res = reducer(initialState, action);

      expect(res.isProcessing).toBeFalsy();
    });
  });
});
