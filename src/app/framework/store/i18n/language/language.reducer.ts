// framework
import { errorFn, startProcessingFn, stopProcessingFn } from '~/app/framework/ngrx';

// module
import { LanguageAction, languageActions } from './language.actions';
import { Language } from './language.model';
import { initialState, State } from './language.state';

export function reducer(state: State = initialState, action: LanguageAction): State {
  return languageActions.match({
    use: () => startProcessingFn<State>(state),
    useSuccess: (language: Language) => {
      return {
        ...stopProcessingFn<State>(state),
        selectedItem: language
      };
    },
    useFail: errorFn<State>(state),
    default: () => state
  })(action);
}
