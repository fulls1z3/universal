// app
import { initialLanguage } from '~/app/framework/i18n';

// module
import { Language } from './language.model';

export const LANGUAGE = 'i18n--language';

export interface State {
  selectedItem: Language;
  isProcessing?: boolean;
  error?: any;
}

export const initialState: State = {
  selectedItem: initialLanguage,
  isProcessing: false,
  error: undefined
};
