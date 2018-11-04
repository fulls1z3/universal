// libs
import { get, isNil } from 'lodash/fp';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// module
import { adapter, AIRLINE, State } from './airline.state';

const getState = createFeatureSelector<State>(AIRLINE);

export const getIsProcessing = createSelector(getState, state => get('isProcessing')(state) || false);
export const getError = createSelector(getState, state => get('error')(state));

const getSelectedId = createSelector(getState, state => get('selectedId')(state));
export const getSelected = createSelector((state: any) => get('entities')(state), getSelectedId, (entities, id) =>
  !isNil(id) && entities[id]);
export const { selectAll: getAll } = adapter.getSelectors(getState);
