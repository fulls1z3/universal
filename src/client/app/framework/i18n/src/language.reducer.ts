// module
import { initialLanguage, Language } from './models/language';
import * as language from './language.actions';

export function reducer(state: Language = initialLanguage,
                        action: language.Actions): Language {
  switch (action.type) {
    case language.USE_LANGUAGE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export const getWorkingLanguage = (state: Language) => state;
