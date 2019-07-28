import { createFeatureSelector, createSelector } from '@ngrx/store';
import { get } from 'lodash/fp';

import { LANGUAGE, State } from './language.state';

const getState = createFeatureSelector<State>(LANGUAGE);

export const getIsProcessing = createSelector(
  getState,
  state => get('isProcessing')(state) || false
);
export const getError = createSelector(
  getState,
  state => get('error')(state)
);
export const getWorkingLanguage = createSelector(
  getState,
  state => get('selectedItem')(state)
);
