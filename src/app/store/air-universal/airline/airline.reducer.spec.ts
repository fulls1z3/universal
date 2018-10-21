// testing
import { t } from '~/app/framework/testing';

// module
import { reducer } from './airline.reducer';
import { initialState } from './airline.state';

t.describe('ng-seed/universal', () => {
  t.describe('store', () => {
    t.describe('air-universal: airline reducer', () => {
      it('should return the initial state', () => {
        const action = {} as any;
        const res = reducer(undefined, action);

        expect(res)
          .toBe(initialState);
      });
    });
  });
});
