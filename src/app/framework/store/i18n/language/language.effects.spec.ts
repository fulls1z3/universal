// angular
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { Actions } from '@ngrx/effects';
import { ConfigService } from '@ngx-config/core';
import { cold, hot } from 'jasmine-marbles';

// framework
import { AnalyticsModule } from '~/app/framework/analytics';
import { I18NService } from '~/app/framework/i18n';
import { languageActions } from '~/app/framework/store';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { t } from '~/app/framework/testing';

// module
import { LanguageEffects } from './language.effects';

const testModuleConfig = () => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        RouterTestingModule,
        AnalyticsModule,
        CoreTestingModule,
        NgrxTestingModule,
        I18NTestingModule
      ],
      providers: [LanguageEffects]
    });
};

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('store', () => {
        t.describe('i18n: LanguageEffects', () => {
          t.be(testModuleConfig);

          t.it('should build without a problem',
            t.inject([LanguageEffects], (effects: LanguageEffects) => {
              t.e(effects)
                .toBeTruthy();
            }));

          t.describe('init$', () => {
            t.it('should dispatch `use` action',
              t.inject([LanguageEffects, ConfigService], (effects: LanguageEffects, config: ConfigService) => {
                const settings = config.getSettings('i18n');
                const defaultLanguage = settings.defaultLanguage;

                const action = languageActions.init(settings);
                const completion = languageActions.use(defaultLanguage.code);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.init$) as any)
                  .toBeObservable(expected);
              }));
          });

          t.describe('use$ w/o `init`', () => {
            t.it('should dispatch `useFail` action w/initial `Language`, on fail',
              t.inject([LanguageEffects], (effects: LanguageEffects) => {
                const unsupportedLanguageCode = 'xx';

                const action = languageActions.use(unsupportedLanguageCode);
                const completion = languageActions.useFail(unsupportedLanguageCode);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.use$) as any)
                  .toBeObservable(expected);
              }));
          });

          t.describe('use$', () => {
            t.it('should dispatch `useSuccess` action w/selected `Language`, on success',
              t.inject([LanguageEffects, ConfigService, I18NService],
                (effects: LanguageEffects, config: ConfigService, i18n: I18NService) => {
                  const settings = config.getSettings('i18n');
                  const defaultLanguage = settings.defaultLanguage;

                  // emulate `init$`
                  i18n.defaultLanguage = defaultLanguage;
                  i18n.availableLanguages = settings.availableLanguages;

                  const action = languageActions.use(defaultLanguage.code);
                  const completion = languageActions.useSuccess(defaultLanguage);

                  const actions$ = TestBed.get(Actions);
                  actions$.stream = hot('-a', {a: action});
                  const expected = cold('-c', {c: completion});

                  (t.e(effects.use$) as any)
                    .toBeObservable(expected);
                }));

            t.it('should dispatch `useSuccess` action w/default `Language`, on fail',
              t.inject([LanguageEffects, ConfigService, I18NService],
                (effects: LanguageEffects, config: ConfigService, i18n: I18NService) => {
                  const settings = config.getSettings('i18n');
                  const defaultLanguage = settings.defaultLanguage;
                  const unsupportedLanguageCode = 'xx';

                  // emulate `init$`
                  i18n.defaultLanguage = defaultLanguage;
                  i18n.availableLanguages = settings.availableLanguages;

                  const action = languageActions.use(unsupportedLanguageCode);
                  const completion = languageActions.useSuccess(defaultLanguage);

                  const actions$ = TestBed.get(Actions);
                  actions$.stream = hot('-a', {a: action});
                  const expected = cold('-c', {c: completion});

                  (t.e(effects.use$) as any)
                    .toBeObservable(expected);
                }));
          });
        });
    });
  });
});
