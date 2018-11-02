// framework
import { entityErrorFn, entityResetFn, entityStartProcessingFn, entityStopProcessingFn, UniqueId } from '~/app/framework/ngrx';

// module
import { AirlineAction, airlineActions } from './airline.actions';
import { Airline, initialAirline } from './airline.model';
import { adapter, initialState, State } from './airline.state';

export function reducer(state: State = initialState, action: AirlineAction): State {
  return airlineActions.match({
    getAllAirlines: () => entityStartProcessingFn<State>(state),
    getAllAirlinesSuccess: (airlines: Array<Airline>) => adapter.addAll(airlines, entityStopProcessingFn<State>(state)),
    getAllAirlinesFail: entityErrorFn<State>(state),
    getOneAirline: () => entityStartProcessingFn<State>(state),
    getOneAirlineSuccess: (airline: Airline) => {
      const { _id } = airline;

      return adapter.addOne(airline, {
        ...entityStopProcessingFn<State>(state),
        selectedId: _id
      });
    },
    getOneAirlineFail: entityErrorFn<State>(state),
    addOneAirline: () => adapter.addOne(initialAirline, {
        ...entityStopProcessingFn<State>(state),
        selectedId: ''
    }),
    createOneAirline: () => entityStartProcessingFn<State>(state),
    createOneAirlineSuccess: (airline: Airline) => {
      return adapter.updateOne({
        id: '',
        changes: airline
      }, {
        ...entityStopProcessingFn<State>(state),
        selectedId: undefined
      });
    },
    createOneAirlineFail: entityResetFn<State>(state),
    updateOneAirline: () => entityStartProcessingFn<State>(state),
    updateOneAirlineSuccess: (airline: Airline) => {
      return adapter.updateOne({
        id: airline._id,
        changes: airline
      }, {
        ...entityStopProcessingFn<State>(state),
        selectedId: undefined
      });
    },
    updateOneAirlineFail: entityResetFn<State>(state),
    deleteOneAirline: () => entityStartProcessingFn<State>(state),
    deleteOneAirlineSuccess: (id: UniqueId) => {
      return adapter.removeOne(id, {
        ...entityStopProcessingFn<State>(state),
        selectedId: undefined
      });
    },
    deleteOneAirlineFail: entityResetFn<State>(state),
    default: () => state
  })(action);
}
