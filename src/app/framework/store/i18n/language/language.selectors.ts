// libs
import { createFeatureSelector, createSelector } from '@ngrx/store';

// module
import { LANGUAGE, State } from './language.state';

const getState = createFeatureSelector<State>(LANGUAGE);

export const getIsProcessing = createSelector(getState, ({ isProcessing }) => isProcessing);
export const getError = createSelector(getState, ({ error }) => error);
export const getWorkingLanguage = createSelector(getState, ({ selectedItem }) => selectedItem);
