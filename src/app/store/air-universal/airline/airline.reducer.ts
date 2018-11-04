// framework
import {
  EMPTY_UNIQUE_ID,
  entityErrorFn,
  entityResetFn,
  entityStartProcessingFn,
  entityStopProcessingFn,
  UniqueId
} from '~/app/framework/ngrx';

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
    getOneAirlineSuccess: (airline: Airline) => adapter.addOne(airline, {
      ...entityStopProcessingFn<State>(state),
      selectedId: airline._id
    }),
    getOneAirlineFail: entityErrorFn<State>(state),
    addOneAirline: () => adapter.addOne(initialAirline, {
      ...entityStopProcessingFn<State>(state),
      selectedId: EMPTY_UNIQUE_ID
    }),
    createOneAirline: () => entityStartProcessingFn<State>(state),
    createOneAirlineSuccess: (airline: Airline) => adapter.updateOne({
      id: EMPTY_UNIQUE_ID,
      changes: airline
    }, {
      ...entityStopProcessingFn<State>(state),
      selectedId: undefined
    }),
    createOneAirlineFail: entityResetFn<State>(state),
    updateOneAirline: () => entityStartProcessingFn<State>(state),
    updateOneAirlineSuccess: (airline: Airline) => adapter.updateOne({
      id: airline._id,
      changes: airline
    }, {
      ...entityStopProcessingFn<State>(state),
      selectedId: undefined
    }),
    updateOneAirlineFail: entityResetFn<State>(state),
    deleteOneAirline: () => entityStartProcessingFn<State>(state),
    deleteOneAirlineSuccess: (id: UniqueId) => adapter.removeOne(id, {
      ...entityStopProcessingFn<State>(state),
      selectedId: undefined
    }),
    deleteOneAirlineFail: entityResetFn<State>(state),
    default: () => state
  })(action);
}
