import { Language } from '@fulls1z3/shared/util-i18n';

import { initialLanguage } from './language.model';

export const LANGUAGE = 'i18n--language';

export interface State {
  selectedItem: Language;
  isProcessing?: boolean;
  error?: string;
}

export const initialState: State = {
  selectedItem: initialLanguage,
  isProcessing: false,
  error: undefined
};
