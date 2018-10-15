// module
import { reducer } from './airline.reducer';
import { initialState } from './airline.state';

describe('Airline Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result)
        .toBe(initialState);
    });
  });
});
