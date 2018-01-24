// angular
import { Injectable } from '@angular/core';

// libs
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

// module
import { Language } from './models/language';
import { I18NService } from './i18n.service';
import * as language from './language.actions';

@Injectable()
export class LanguageEffects {
  @Effect()
  init$: Observable<Action> = this.actions
    .pipe(
      ofType(language.INIT),
      map((action: language.Init) => action.payload),
      switchMap((settings: any) => this.i18n.init(settings)),
      map((res: Language) => new language.UseLanguageSuccess(res))
    );

  @Effect()
  useLanguage$: Observable<Action> = this.actions
    .pipe(
      ofType(language.USE_LANGUAGE),
      map((action: language.UseLanguage) => action.payload),
      switchMap((languageCode: string) => this.i18n.getLanguageByCode(languageCode)),
      map((res: any) => {
        if (res.name) {
          const useLanguageSuccess = new language.UseLanguageSuccess(res);

          // track analytics
          this.i18n.track(useLanguageSuccess.type, {label: useLanguageSuccess.payload.code});

          return useLanguageSuccess;
        } else
          return new language.UseLanguageUnsupported(res.code);
      })
    );

  constructor(private readonly actions: Actions,
              private readonly i18n: I18NService) {
  }
}
