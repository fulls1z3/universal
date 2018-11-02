// angular
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// libs
import { ConfigService } from '@ngx-config/core';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { t } from '~/app/framework/testing';

// module
import { languageActions } from './language.actions';
import { reducer } from './language.reducer';
import { initialState } from './language.state';

const testModuleConfig = () => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [CoreTestingModule]
    });
};

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('store', () => {
      t.describe('i18n: language reducer', () => {
        t.be(testModuleConfig);

        t.it('should return the initial state', () => {
          const action = {} as any;
          const res = reducer(undefined, action);

          expect(res)
            .toBe(initialState);
        });

        t.describe('use', () => {
          t.it('should return the `isProcessing` on the state',
            t.inject([ConfigService], (config: ConfigService) => {
              const defaultLanguage = config.getSettings('i18n.defaultLanguage');
              const action = languageActions.use(defaultLanguage.code);
              const res = reducer(initialState, action);

              t.e(res.isProcessing)
                .toEqual(true);
            }));
        });

        t.describe('useSuccess', () => {
          t.it('should return the `selectedItem` on the state',
            t.inject([ConfigService], (config: ConfigService) => {
              const defaultLanguage = config.getSettings('i18n.defaultLanguage');
              const action = languageActions.useSuccess(defaultLanguage);
              const res = reducer(initialState, action);

              t.e(res.selectedItem)
                .toEqual(defaultLanguage);
            }));
        });
      });
    });
  });
});
