// testing
import { t } from '~/app/framework/testing';

// module
import { errorFn, startProcessingFn, stopProcessingFn } from './reducer.util';

const ERROR_MESSAGE = 'Something went wrong.';

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('ngrx: startProcessingFn', () => {
      t.it('should set `isProcessing` to true', () => {
        const preState = {};
        const postState = startProcessingFn(preState);

        t.e(postState)
          .toEqual(
            {
              ...preState,
              isProcessing: true,
              selectedItem: undefined
            }
          );
      });
    });

    t.describe('ngrx: stopProcessingFn', () => {
      t.it('should set `isProcessing` to false', () => {
        const preState = {};
        const postState = stopProcessingFn(preState);

        t.e(postState)
          .toEqual(
            {
              ...preState,
              isProcessing: false
            }
          );
      });
    });

    t.describe('ngrx: errorFn', () => {
      t.it('should set the `error`', () => {
        const preState = {};
        const postState = errorFn(preState)(ERROR_MESSAGE);

        t.e(postState)
          .toEqual(
            {
              ...preState,
              isProcessing: false,
              selectedItem: undefined,
              error: ERROR_MESSAGE
            }
          );
      });
    });
  });
});
