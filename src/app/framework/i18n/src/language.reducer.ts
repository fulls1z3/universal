// shared
import { switchCase } from '~/app/shared/common/util';

// module
import { initialLanguage, Language } from './models/language';
import { Actions, LanguageAction } from './language.actions';

export function reducer(state: Language = initialLanguage,
                        action: Actions): Language {
  return switchCase({
    [LanguageAction.USE_LANGUAGE_SUCCESS]: {
      ...state,
      ...action.payload
    }
  })(state)(action.type);
}

export const getWorkingLanguage = (state: Language) => state;
