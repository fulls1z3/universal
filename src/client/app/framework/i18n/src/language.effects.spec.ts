// angular
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { cold, hot } from 'jasmine-marbles';
import { StoreModule } from '@ngrx/store';
import { Actions, EffectsModule } from '@ngrx/effects';
import { ConfigLoader, ConfigService } from '@ngx-config/core';

// framework
import { t } from '../../testing';
import { configFactory, CoreModule } from '../../core/core.module';
import { CoreTestingModule } from '../../core/testing/core-testing.module';
import { NgrxTestingModule } from '../../ngrx/testing/ngrx-testing.module';

// module
import { I18NTestingModule } from '../testing/i18n-testing.module';
import { AnalyticsModule } from '../../analytics/analytics.module';
import { I18NService } from './i18n.service';
import * as language from './language.actions';
import { LanguageEffects } from './language.effects';
import { reducers } from './reducers';

const testModuleConfig = () => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
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
        CoreTestingModule,
        NgrxTestingModule,
        AnalyticsModule,
        I18NTestingModule
      ],
      providers: [
        LanguageEffects
      ]
    });
};

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('i18n: LanguageEffects', () => {
      t.be(() => testModuleConfig());

      t.describe('init$', () => {
        t.it('should be able to initialize i18n',
          t.inject([LanguageEffects, ConfigService], (effects: LanguageEffects, config: ConfigService) => {
            const defaultLanguage = config.getSettings('i18n.defaultLanguage');

            const action = new language.Init(config.getSettings('i18n'));
            const completion = new language.UseLanguageSuccess(defaultLanguage);

            const actions$ = TestBed.get(Actions);
            actions$.stream = hot('-a', {a: action});
            const expected = cold('-c', {c: completion});

            (t.e(effects.init$) as any).toBeObservable(expected);
          }));
      });

      t.describe('useLanguage$ w/o i18n.init', () => {
        t.it('should be able to return a language.UseLanguageUnsupported w/initial `Language`, on unsupported',
          t.inject([LanguageEffects], (effects: LanguageEffects) => {
            const unsupportedLanguageCode = 'xx';

            const action = new language.UseLanguage(unsupportedLanguageCode);
            const completion = new language.UseLanguageUnsupported(unsupportedLanguageCode);

            const actions$ = TestBed.get(Actions);
            actions$.stream = hot('-a', {a: action});
            const expected = cold('-c', {c: completion});

            (t.e(effects.useLanguage$) as any).toBeObservable(expected);
          }));
      });

      t.describe('useLanguage$', () => {
        t.it('should be able to return a language.UseLanguageSuccess w/selected `Language`, on success',
          t.inject([LanguageEffects, ConfigService, I18NService], (effects: LanguageEffects, config: ConfigService, i18n: I18NService) => {
            i18n.init(config.getSettings('i18n'))
              .subscribe(() => {
                const defaultLanguage = config.getSettings('i18n.defaultLanguage');

                const action = new language.UseLanguage(defaultLanguage.code);
                const completion = new language.UseLanguageSuccess(defaultLanguage);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.useLanguage$) as any).toBeObservable(expected);
              });
          }));

        t.it('should be able to return a language.UseLanguageUnsupported w/default `Language`, on unsupported',
          t.inject([LanguageEffects, ConfigService, I18NService], (effects: LanguageEffects, config: ConfigService, i18n: I18NService) => {
            i18n.init(config.getSettings('i18n'))
              .subscribe(() => {
                const unsupportedLanguageCode = 'xx';
                const defaultLanguage = config.getSettings('i18n.defaultLanguage');

                const action = new language.UseLanguage(unsupportedLanguageCode);
                const completion = new language.UseLanguageSuccess(defaultLanguage);

                const actions$ = TestBed.get(Actions);
                actions$.stream = hot('-a', {a: action});
                const expected = cold('-c', {c: completion});

                (t.e(effects.useLanguage$) as any).toBeObservable(expected);
              });
          }));
      });
    });
  });
});
