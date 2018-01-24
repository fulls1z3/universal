// angular
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// libs
import { ConfigLoader, ConfigService } from '@ngx-config/core';

// framework
import { t } from '../../testing';
import { configFactory, CoreModule } from '../../core/core.module';
import { CoreTestingModule } from '../../core/testing/core-testing.module';

// module
import { initialLanguage } from './models/language';
import * as language from './language.actions';
import { getWorkingLanguage, reducer } from './language.reducer';

const testModuleConfig = () => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        CoreModule.forRoot([
          {
            provide: ConfigLoader,
            useFactory: configFactory,
            deps: [
              PLATFORM_ID,
              HttpClient
            ]
          }
        ]),
        CoreTestingModule
      ]
    });
};

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('i18n: LanguageReducer', () => {
      t.describe('reducer', () => {
        t.describe('undefined action', () => {
          t.it('should be able to return the `initialLanguage`',
            () => {
              const action = {};
              const res = reducer(undefined, action as any);

              t.e(res)
                .toEqual(initialLanguage);
            });
        });

        t.describe('USE_LANGUAGE_SUCCESS', () => {
          t.be(testModuleConfig);

          t.it('should be able to return the selected `Language` on the state',
            t.inject([ConfigService], (config: ConfigService) => {
              const defaultLanguage = config.getSettings('i18n.defaultLanguage');
              const action = new language.UseLanguageSuccess(defaultLanguage);
              const res = reducer(defaultLanguage, action);

              t.e(res)
                .toEqual(defaultLanguage);
            }));
        });
      });

      t.describe('getWorkingLanguage', () => {
        t.be(testModuleConfig);

        t.it('should be able to return the selected `Language` on the state',
          t.inject([ConfigService], (config: ConfigService) => {
            const defaultLanguage = config.getSettings('i18n.defaultLanguage');
            const res = getWorkingLanguage(defaultLanguage);

            t.e(res)
              .toBe(defaultLanguage);
          }));
      });
    });
  });
});
