// app
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
    airUniversalGetAllAirlines: () => entityStartProcessingFn<State>(state),
    airUniversalGetAllAirlinesSuccess: (airlines: Array<Airline>) => adapter.addAll(airlines, entityStopProcessingFn<State>(state)),
    airUniversalGetAllAirlinesFail: entityErrorFn<State>(state),
    airUniversalGetOneAirline: () => entityStartProcessingFn<State>(state),
    airUniversalGetOneAirlineSuccess: (airline: Airline) => adapter.addOne(airline, {
      ...entityStopProcessingFn<State>(state),
      selectedId: airline._id
    }),
    airUniversalGetOneAirlineFail: entityErrorFn<State>(state),
    airUniversalAddOneAirline: () => adapter.addOne(initialAirline, {
      ...entityStopProcessingFn<State>(state),
      selectedId: EMPTY_UNIQUE_ID
    }),
    airUniversalCreateOneAirline: () => entityStartProcessingFn<State>(state),
    airUniversalCreateOneAirlineSuccess: (airline: Airline) => adapter.updateOne({
      id: EMPTY_UNIQUE_ID,
      changes: airline
    }, {
      ...entityStopProcessingFn<State>(state),
      selectedId: undefined
    }),
    airUniversalCreateOneAirlineFail: entityResetFn<State>(state),
    airUniversalUpdateOneAirline: () => entityStartProcessingFn<State>(state),
    airUniversalUpdateOneAirlineSuccess: (airline: Airline) => adapter.updateOne({
      id: airline._id,
      changes: airline
    }, {
      ...entityStopProcessingFn<State>(state),
      selectedId: undefined
    }),
    airUniversalUpdateOneAirlineFail: entityResetFn<State>(state),
    airUniversalDeleteOneAirline: () => entityStartProcessingFn<State>(state),
    airUniversalDeleteOneAirlineSuccess: (id: UniqueId) => adapter.removeOne(id, {
      ...entityStopProcessingFn<State>(state),
      selectedId: undefined
    }),
    airUniversalDeleteOneAirlineFail: entityResetFn<State>(state),
    default: () => state
  })(action);
}
