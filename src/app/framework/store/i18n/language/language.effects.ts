import { Injectable, Injector } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash/fp';
import { filter, map } from 'rxjs/operators';
import { I18NService } from '~/app/framework/i18n/i18n.service';

import { languageActions } from './language.actions';

@Injectable()
export class LanguageEffects {
  @Effect() init$ = this.actions.pipe(
    filter(languageActions.is.i18nInitLanguage),
    map(get('payload')),
    map(payload => {
      this.i18n.defaultLanguage = payload.defaultLanguage;
      this.i18n.availableLanguages = payload.availableLanguages;
      this.i18n.useLocalizedRoutes = payload.useLocalizedRoutes;

      const meta = this.injector.get(MetaService);
      meta.setTag('og:locale', this.i18n.defaultLanguage.culture);

      this.translate.addLangs(payload.availableLanguages.map((cur: any) => cur.code));
      this.translate.setDefaultLang(payload.defaultLanguage.code);

      const detectedLanguage = this.i18n.getLanguageCodeFromBrowser();

      return languageActions.i18nUseLanguage(detectedLanguage);
    })
  );

  @Effect() use$ = this.actions.pipe(
    filter(languageActions.is.i18nUseLanguage),
    map(get('payload')),
    map(payload => {
      const language = this.i18n.getLanguageByCode(payload);

      if (get('code')(language)) {
        this.translate.use(language.code).subscribe(() => {
          const meta = this.injector.get(MetaService);
          meta.setTag('og:locale', language.culture);
        });

        const success = languageActions.i18nUseLanguageSuccess(language);

        this.i18n.track(success.type, { label: language.code });

        return success;
      }

      return languageActions.i18nUseLanguageFail(payload);
    })
  );

  constructor(
    private readonly injector: Injector,
    private readonly actions: Actions,
    private readonly translate: TranslateService,
    private readonly i18n: I18NService
  ) {}
}
