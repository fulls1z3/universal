import { errorFn, startProcessingFn, stopProcessingFn } from '~/app/framework/ngrx';

import { LanguageAction, languageActions } from './language.actions';
import { Language } from './language.model';
import { initialState, State } from './language.state';

// NOTE: for AoT compilation
// tslint:disable-next-line
export function reducer(state: State = initialState, action: LanguageAction): State {
  return languageActions.match({
    i18nUseLanguage: () => startProcessingFn<State>(state),
    i18nUseLanguageSuccess: (language: Language) => ({
      ...stopProcessingFn<State>(state),
      selectedItem: language
    }),
    i18nUseLanguageFail: errorFn<State>(state),
    default: () => state
  })(action);
}
