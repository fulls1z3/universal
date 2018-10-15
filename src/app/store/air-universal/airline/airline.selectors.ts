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

const isProcessing = (state: State) => state.isProcessing;
const error = (state: State) => state.error;

export const getIsProcessing = createSelector(getState, isProcessing);
export const getError = createSelector(getState, error);

const getSelectedId = createSelector(getState, ({ selectedId }) => selectedId);
export const getSelected = createSelector(selectEntities, getSelectedId, (entities, id) => !isNil(id) && entities[id]);
