// libs
import { createFeatureSelector, createSelector } from '@ngrx/store';

// module
import { I18NState } from './models/i18n-state';
import { getWorkingLanguage as _getWorkingLanguage, reducer as _languageReducer } from './language.reducer';

export const reducers = {language: _languageReducer};

const selectI18NState = createFeatureSelector<I18NState>('i18n');
const selectLanguageState = createSelector(selectI18NState, cur => cur.language);
export const getWorkingLanguage = createSelector(selectLanguageState, _getWorkingLanguage);
