// angular
import { Injectable, Injector } from '@angular/core';

// libs
import { filter, map } from 'rxjs/operators';
import { get } from 'lodash/fp';
import { Actions, Effect } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { MetaService } from '@ngx-meta/core';
// TODO: ngx-i18n-router
// import { I18NRouterService } from '@ngx-language-router/core';

// framework
import { I18NService } from '~/app/framework/i18n/i18n.service';

// module
import { languageActions } from './language.actions';

@Injectable()
export class LanguageEffects {
  @Effect() init$ = this.actions
    .pipe(
      filter(languageActions.is.init),
      map(get('payload')),
      map(payload => {
        this.i18n.defaultLanguage = payload.defaultLanguage;
        this.i18n.availableLanguages = payload.availableLanguages;
        this.i18n.useLocalizedRoutes = payload.useLocalizedRoutes;

        const meta = this.injector.get(MetaService);
        meta.setTag('og:locale', this.i18n.defaultLanguage.culture);

        this.translate.addLangs(payload.availableLanguages
          .map((cur: any) => cur.code));
        this.translate.setDefaultLang(payload.defaultLanguage.code);

        // TODO: ngx-i18n-router
        // detect language from location/browser (if applicable)
        // let detectedLanguage;
        //
        // if (this.useLocalizedRoutes)
        //   detectedLanguage = this.getLanguageFromLocation();
        //
        // if (!detectedLanguage)
        const detectedLanguage = this.i18n.getLanguageCodeFromBrowser();

        // TODO: ngx-i18n-router
        // this.i18nRouter.init(this.useLocalizedRoutes);

        return languageActions.use(detectedLanguage);
      })
    );

  @Effect() use$ = this.actions
    .pipe(
      filter(languageActions.is.use),
      map(get('payload')),
      map(payload => {
        const language = this.i18n.getLanguageByCode(payload);

        if (get('code')(language)) {
          this.translate.use(language.code)
            .subscribe(() => {
              const meta = this.injector.get(MetaService);
              meta.setTag('og:locale', language.culture);
            });

          // TODO: ngx-i18n-router
          // if (this.i18n.availableLanguages.length > 1)
          //   this.i18nRouter.useLanguage(state.code);

          const success = languageActions.useSuccess(language);

          this.i18n.track(success.type, {label: language.code});

          return success;
        }

        return languageActions.useFail(payload);
      })
    );

  constructor(private readonly injector: Injector,
              private readonly actions: Actions,
              private readonly translate: TranslateService,
              // TODO: ngx-i18n-router
              // private readonly i18nRouter: I18NRouterService,
              private readonly i18n: I18NService) {
  }
}
