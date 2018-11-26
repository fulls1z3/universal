// libs
import { get, isNil } from 'lodash/fp';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// module
import { adapter, AIRLINE, State } from './airline.state';

const getState = createFeatureSelector<State>(AIRLINE);
const {selectAll} = adapter.getSelectors(getState);

export const getIsProcessing = createSelector(getState, state => get('isProcessing')(state) || false);
export const getError = createSelector(getState, state => get('error')(state));

export const getSelectedId = createSelector(getState, state => get('selectedId')(state));
export const getSelected = createSelector(get(`${AIRLINE}.entities`), getSelectedId, (entities, id) => !isNil(id) && entities[id]);

export { selectAll as getAll };
