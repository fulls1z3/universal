import {
  EMPTY_UNIQUE_ID,
  entityErrorFn,
  entityResetFn,
  entityStartProcessingFn,
  entityStopProcessingFn,
  UniqueId
} from '@fulls1z3/shared/util-store';

import { AirlineAction, airlineActions } from './airline.actions';
import { Airline, initialAirline } from './airline.model';
import { adapter, initialState, State } from './airline.state';

// NOTE: for AoT compilation
// tslint:disable-next-line:only-arrow-functions
export function reducer(state: State = initialState, action: AirlineAction): State {
  return airlineActions.match({
    airUniversalGetManyAirlines: () => entityStartProcessingFn<State>(state),
    airUniversalGetManyAirlinesSuccess: (airlines: Array<Airline>) => adapter.addAll(airlines, entityStopProcessingFn<State>(state)),
    airUniversalGetManyAirlinesFail: entityErrorFn<State>(state),
    airUniversalGetOneAirline: () => entityStartProcessingFn<State>(state),
    airUniversalGetOneAirlineSuccess: (airline: Airline) =>
      adapter.addOne(airline, {
        ...entityStopProcessingFn<State>(state),
        selectedId: airline.id
      }),
    airUniversalGetOneAirlineFail: entityErrorFn<State>(state),
    airUniversalAddOneAirline: () =>
      adapter.addOne(initialAirline, {
        ...entityStopProcessingFn<State>(state),
        selectedId: EMPTY_UNIQUE_ID
      }),
    airUniversalCreateOneAirline: () => entityStartProcessingFn<State>(state),
    airUniversalCreateOneAirlineSuccess: (airline: Airline) =>
      adapter.updateOne(
        {
          id: EMPTY_UNIQUE_ID,
          changes: airline
        },
        {
          ...entityStopProcessingFn<State>(state),
          selectedId: undefined
        }
      ),
    airUniversalCreateOneAirlineFail: entityResetFn<State>(state),
    airUniversalUpdateOneAirline: () => entityStartProcessingFn<State>(state),
    airUniversalUpdateOneAirlineSuccess: (airline: Airline) =>
      adapter.updateOne(
        {
          id: airline.id,
          changes: airline
        },
        {
          ...entityStopProcessingFn<State>(state),
          selectedId: undefined
        }
      ),
    airUniversalUpdateOneAirlineFail: entityResetFn<State>(state),
    airUniversalDeleteOneAirline: () => entityStartProcessingFn<State>(state),
    airUniversalDeleteOneAirlineSuccess: (id: UniqueId) =>
      adapter.removeOne(id, {
        ...entityStopProcessingFn<State>(state),
        selectedId: undefined
      }),
    airUniversalDeleteOneAirlineFail: entityResetFn<State>(state),
    default: () => state
  })(action);
}
