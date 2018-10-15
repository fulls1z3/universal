// framework
import { errorFn, startProcessingFn, stopProcessingFn, UniqueId } from '~/app/framework/ngrx';

// module
import { AirlineAction, airlineActions } from './airline.actions';
import { Airline, initialAirline } from './airline.model';
import { adapter, initialState, State } from './airline.state';
import { resetFn } from '~/app/framework/ngrx/src/entity-reducer.util';

export const reducer = (state: State = initialState, action: AirlineAction) => {
  return airlineActions.match({
    getAll: (force: boolean) => {
      if (!force && state.ids.length > 0)
        return state;

      return startProcessingFn<State>(state);
    },
    getAllSuccess: (airlines: Array<Airline>) => adapter.addAll(airlines, stopProcessingFn<State>(state)),
    getAllFail: errorFn<State>(state),
    getOne: () => startProcessingFn<State>(state),
    getOneSuccess: (airline: Airline) => {
      const { _id } = airline;

      return adapter.addOne(airline, {
        ...stopProcessingFn<State>(state),
        selectedId: _id
      });
    },
    getOneFail: errorFn<State>(state),
    addOne: () => adapter.addOne(initialAirline, {
        ...stopProcessingFn<State>(state),
        selectedId: ''
    }),
    createOne: () => startProcessingFn<State>(state),
    createOneSuccess: (airline: Airline) => {
      return adapter.updateOne({
        id: '',
        changes: airline
      }, {
        ...stopProcessingFn<State>(state),
        selectedId: undefined
      });
    },
    createOneFail: resetFn<State>(state),
    updateOne: () => startProcessingFn<State>(state),
    updateOneSuccess: (airline: Airline) => {
      return adapter.updateOne({
        id: airline._id,
        changes: airline
      }, {
        ...stopProcessingFn<State>(state),
        selectedId: undefined
      });
    },
    updateOneFail: resetFn<State>(state),
    deleteOne: () => startProcessingFn<State>(state),
    deleteOneSuccess: (id: UniqueId) => {
      return adapter.removeOne(id, {
        ...stopProcessingFn<State>(state),
        selectedId: undefined
      });
    },
    deleteOneFail: resetFn<State>(state),
    default: a => state // NOTE: a === action
  })(action);
};
