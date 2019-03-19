import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { ConfigService } from '@ngx-config/core';
import { cold, hot } from 'jasmine-marbles';
import { AnalyticsModule } from '~/app/framework/analytics';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { languageActions } from '~/app/framework/store';
import { t } from '~/app/framework/testing';

import { I18NService } from '../../../i18n/i18n.service';

import { LanguageEffects } from './language.effects';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, CoreTestingModule, NgrxTestingModule, I18NTestingModule, AnalyticsModule],
    providers: [LanguageEffects]
  });
};

t.describe('LanguageEffects', () => {
  t.be(() => {
    testModuleConfig();
  });

  t.it(
    'should build without a problem',
    t.inject([LanguageEffects], (instance: LanguageEffects) => {
      t.e(instance).toBeTruthy();
    })
  );

  t.describe('init$', () => {
    t.it(
      'should dispatch `use` action',
      t.inject([LanguageEffects, ConfigService], (effects: LanguageEffects, config: ConfigService) => {
        const settings = config.getSettings('i18n');
        const defaultLanguage = settings.defaultLanguage;

        const action = languageActions.i18nInitLanguage(settings);
        const completion = languageActions.i18nUseLanguage(defaultLanguage.code);

        const actions$ = TestBed.get(Actions);
        actions$.stream = hot('-a', { a: action });

        const actual = effects.init$;
        const expected = cold('-c', { c: completion });

        t.e(actual).toBeObservable(expected);
      })
    );
  });

  t.describe('use$ w/o `init`', () => {
    t.it(
      'should dispatch `useFail` action w/initial `Language`, on fail',
      t.inject([LanguageEffects], (effects: LanguageEffects) => {
        const unsupportedLanguageCode = 'xx';

        const action = languageActions.i18nUseLanguage(unsupportedLanguageCode);
        const completion = languageActions.i18nUseLanguageFail(unsupportedLanguageCode);

        const actions$ = TestBed.get(Actions);
        actions$.stream = hot('-a', { a: action });

        const actual = effects.use$;
        const expected = cold('-c', { c: completion });

        t.e(actual).toBeObservable(expected);
      })
    );
  });

  t.describe('use$', () => {
    t.it(
      'should dispatch `useSuccess` action w/selected `Language`, on success',
      t.inject([LanguageEffects, ConfigService, I18NService], (effects: LanguageEffects, config: ConfigService, i18n: I18NService) => {
        const settings = config.getSettings('i18n');
        const defaultLanguage = settings.defaultLanguage;

        i18n.defaultLanguage = defaultLanguage;
        i18n.availableLanguages = settings.availableLanguages;

        const action = languageActions.i18nUseLanguage(defaultLanguage.code);
        const completion = languageActions.i18nUseLanguageSuccess(defaultLanguage);

        const actions$ = TestBed.get(Actions);
        actions$.stream = hot('-a', { a: action });

        const actual = effects.use$;
        const expected = cold('-c', { c: completion });

        t.e(actual).toBeObservable(expected);
      })
    );

    t.it(
      'should dispatch `useSuccess` action w/default `Language`, on fail',
      t.inject([LanguageEffects, ConfigService, I18NService], (effects: LanguageEffects, config: ConfigService, i18n: I18NService) => {
        const settings = config.getSettings('i18n');
        const defaultLanguage = settings.defaultLanguage;
        const unsupportedLanguageCode = 'xx';

        i18n.defaultLanguage = defaultLanguage;
        i18n.availableLanguages = settings.availableLanguages;

        const action = languageActions.i18nUseLanguage(unsupportedLanguageCode);
        const completion = languageActions.i18nUseLanguageSuccess(defaultLanguage);

        const actions$ = TestBed.get(Actions);
        actions$.stream = hot('-a', { a: action });

        const actual = effects.use$;
        const expected = cold('-c', { c: completion });

        t.e(actual).toBeObservable(expected);
      })
    );
  });
});
