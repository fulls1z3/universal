import { Language } from '@fulls1z3/shared/util-i18n';
import { errorFn, startProcessingFn, stopProcessingFn } from '@fulls1z3/shared/util-store';

import { LanguageAction, languageActions } from './language.actions';
import { initialState, State } from './language.state';

// NOTE: for AoT compilation
// tslint:disable-next-line:only-arrow-functions
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
