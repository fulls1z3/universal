// libs
import { createFeatureSelector, createSelector } from '@ngrx/store';

// module
import { I18NState } from './models/i18n-state';
import * as language from './language.reducer';

export const reducers = {language: language.reducer};

const selectI18NState = createFeatureSelector<I18NState>('i18n');
const selectLanguageState = createSelector(selectI18NState, (state: I18NState) => state.language);
export const getWorkingLanguage = createSelector(selectLanguageState, language.getWorkingLanguage);
