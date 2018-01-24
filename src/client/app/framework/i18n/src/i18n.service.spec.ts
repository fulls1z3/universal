// angular
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { select, Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigLoader, ConfigService } from '@ngx-config/core';

// framework
import { t } from '../../testing';
import { configFactory, CoreModule, WindowService } from '../../core/core.module';
import { CoreTestingModule, MockWindowFrench, MockWindowNoLanguage } from '../../core/testing/core-testing.module';

// module
import { I18NTestingModule } from '../testing/i18n-testing.module';
import { AnalyticsModule } from '../../analytics/analytics.module';
import { Language } from './models/language';
import { I18NService } from './i18n.service';
import { LanguageEffects } from './language.effects';
import { getWorkingLanguage, reducers } from './reducers';

const testModuleConfig = (options?: any) => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forFeature('i18n', reducers),
        EffectsModule.forFeature([LanguageEffects]),
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
        CoreTestingModule.withOptions(options),
        AnalyticsModule,
        I18NTestingModule
      ]
    });
};

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('i18n: I18NService', () => {
      t.be(() => testModuleConfig());

      t.it('should be able to support `english` by default',
        t.inject([ConfigService, I18NService], (config: ConfigService, i18n: I18NService) => {
          i18n.init(config.getSettings('i18n'));

          t.e(i18n.availableLanguages.length)
            .toBe(1);
          t.e(i18n.availableLanguages[0].code)
            .toBe('en');
        }));
    });

    t.describe('i18n: I18NService for `server` platform', () => {
      t.be(() => testModuleConfig({platformId: 'server'}));

      t.it('should be able to support `english` by default',
        t.inject([ConfigService, I18NService], (config: ConfigService, i18n: I18NService) => {
          i18n.init(config.getSettings('i18n'));

          t.e(i18n.availableLanguages.length)
            .toBe(1);
          t.e(i18n.availableLanguages[0].code)
            .toBe('en');
        }));
      });

    t.describe('i18n: I18NService for `fr` browser', () => {
      t.be(() => {
        testModuleConfig({
          window: MockWindowFrench,
          config: ConfigService
        });
      });

      t.it('should be able to support `french` by default',
        t.inject([ConfigService, I18NService, Store, WindowService],
          (config: ConfigService, i18n: I18NService, languageStore: Store<Language>, win: WindowService) => {
            config.init()
              .then(() => {
                i18n.init(config.getSettings('i18n'));

                t.e(i18n.availableLanguages.length)
                  .toBe(2);
                t.e(i18n.availableLanguages[0].code)
                  .toBe('en');
                t.e(i18n.availableLanguages[1].code)
                  .toBe('fr');
                t.e(win.navigator.language)
                  .toBe('fr-FR');

                languageStore.pipe(select(getWorkingLanguage))
                  .subscribe((state: Language) => {
                    t.e(state.code)
                      .toBe('fr');
                  });
              });
          }));
    });

    t.describe('i18n: I18NService for browser w/o language', () => {
      t.be(() => {
        testModuleConfig({
          window: MockWindowNoLanguage
        });
      });

      t.it('should be able to support `english` by default',
        t.inject([ConfigService, I18NService, Store, WindowService],
          (config: ConfigService, i18n: I18NService, languageStore: Store<Language>, win: WindowService) => {
            i18n.init(config.getSettings('i18n'));

            t.e(i18n.availableLanguages.length)
              .toBe(1);
            t.e(i18n.availableLanguages[0].code)
              .toBe('en');
            t.e(win.navigator.language)
              .toBeUndefined();

            languageStore.pipe(select(getWorkingLanguage))
              .subscribe((state: Language) => {
                t.e(state.code)
                  .toBe('en');
              });
          }));
    });
  });
});
