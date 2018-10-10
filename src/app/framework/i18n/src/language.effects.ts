// angular
import { Injectable } from '@angular/core';

// libs
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

// module
import { I18NService } from './i18n.service';
import { Init, LanguageAction, UseLanguage, UseLanguageSuccess, UseLanguageUnsupported } from './language.actions';

@Injectable()
export class LanguageEffects {
  @Effect() init$: Observable<Action> = this.actions
    .pipe(
      ofType(LanguageAction.INIT),
      map((cur: Init) => cur.payload),
      switchMap(res => this.i18n.init(res)),
      map(cur => new UseLanguageSuccess(cur))
    );

  @Effect() useLanguage$: Observable<Action> = this.actions
    .pipe(
      ofType(LanguageAction.USE_LANGUAGE),
      map((cur: UseLanguage) => cur.payload),
      switchMap(res => this.i18n.getLanguageByCode(res)),
      map(cur => {
        if (cur.name) {
          const useLanguageSuccess = new UseLanguageSuccess(cur);

          // track analytics
          this.i18n.track(useLanguageSuccess.type, {label: useLanguageSuccess.payload.code});

          return useLanguageSuccess;
        } else
          return new UseLanguageUnsupported(cur.code);
      })
    );

  constructor(private readonly actions: Actions,
              private readonly i18n: I18NService) {
  }
}
