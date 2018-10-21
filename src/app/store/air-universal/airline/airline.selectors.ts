// libs
import { isNil } from 'lodash/fp';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// module
import { adapter, AIRLINE, State } from './airline.state';

const getState = createFeatureSelector<State>(AIRLINE);
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(getState);

export const getIsProcessing = createSelector(getState, ({ isProcessing }) => isProcessing);
export const getError = createSelector(getState, ({ error }) => error);

const getSelectedId = createSelector(getState, ({ selectedId }) => selectedId);
export const getSelected = createSelector(selectEntities, getSelectedId, (entities, id) => !isNil(id) && entities[id]);
