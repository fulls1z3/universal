// angular
import { Injectable } from '@angular/core';

// libs
import 'rxjs/add/operator/switchMap';
import { Actions, Effect, toPayload } from '@ngrx/effects';

// module
import { Language } from './models/language';
import { I18NService } from './i18n.service';
import * as language from './language.actions';

@Injectable()
export class LanguageEffects {
  @Effect() init$ = this.actions.ofType(language.INIT)
    .map(toPayload)
    .switchMap((settings: any) => this.i18n.init(settings))
    .map((res: Language) => new language.UseLanguageSuccess(res));

  @Effect() useLanguage$ = this.actions.ofType(language.USE_LANGUAGE)
    .map(toPayload)
    .switchMap((languageCode: string) => this.i18n.getLanguageByCode(languageCode))
    .map((res: any) => {
      if (res.name) {
        const useLanguageSuccess = new language.UseLanguageSuccess(res);

        // track analytics
        this.i18n.track(useLanguageSuccess.type, {label: useLanguageSuccess.payload.code});

        return useLanguageSuccess;
      } else
        return new language.UseLanguageUnsupported(res.code);
    });

  constructor(private readonly actions: Actions,
              private readonly i18n: I18NService) {
  }
}
