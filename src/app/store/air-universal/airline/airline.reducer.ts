// framework
import { entityErrorFn, entityResetFn, entityStartProcessingFn, entityStopProcessingFn, UniqueId } from '~/app/framework/ngrx';

// module
import { AirlineAction, airlineActions } from './airline.actions';
import { Airline, initialAirline } from './airline.model';
import { adapter, initialState, State } from './airline.state';

export function reducer(state: State = initialState, action: AirlineAction): State {
  return airlineActions.match({
    getAll: (force: boolean) => {
      if (!force && state.ids.length > 0)
        return state;

      return entityStartProcessingFn<State>(state);
    },
    getAllSuccess: (airlines: Array<Airline>) => adapter.addAll(airlines, entityStopProcessingFn<State>(state)),
    getAllFail: entityErrorFn<State>(state),
    getOne: () => entityStartProcessingFn<State>(state),
    getOneSuccess: (airline: Airline) => {
      const { _id } = airline;

      return adapter.addOne(airline, {
        ...entityStopProcessingFn<State>(state),
        selectedId: _id
      });
    },
    getOneFail: entityErrorFn<State>(state),
    addOne: () => adapter.addOne(initialAirline, {
        ...entityStopProcessingFn<State>(state),
        selectedId: ''
    }),
    createOne: () => entityStartProcessingFn<State>(state),
    createOneSuccess: (airline: Airline) => {
      return adapter.updateOne({
        id: '',
        changes: airline
      }, {
        ...entityStopProcessingFn<State>(state),
        selectedId: undefined
      });
    },
    createOneFail: entityResetFn<State>(state),
    updateOne: () => entityStartProcessingFn<State>(state),
    updateOneSuccess: (airline: Airline) => {
      return adapter.updateOne({
        id: airline._id,
        changes: airline
      }, {
        ...entityStopProcessingFn<State>(state),
        selectedId: undefined
      });
    },
    updateOneFail: entityResetFn<State>(state),
    deleteOne: () => entityStartProcessingFn<State>(state),
    deleteOneSuccess: (id: UniqueId) => {
      return adapter.removeOne(id, {
        ...entityStopProcessingFn<State>(state),
        selectedId: undefined
      });
    },
    deleteOneFail: entityResetFn<State>(state),
    default: () => state
  })(action);
}
