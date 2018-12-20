import { Router } from '@angular/router';
import { ofType, unionize, UnionOf } from 'unionize';
import { UniqueId } from '~/app/framework/ngrx';

import { Airline } from './airline.model';

export const airlineActions = unionize(
  {
    airUniversalGetManyAirlines: {},
    airUniversalGetManyAirlinesSuccess: ofType<Array<Airline>>(),
    airUniversalGetManyAirlinesFail: ofType<string>(),
    airUniversalGetOneAirline: ofType<UniqueId>(),
    airUniversalGetOneAirlineSuccess: ofType<Airline>(),
    airUniversalGetOneAirlineFail: ofType<string>(),
    airUniversalAddOneAirline: {},
    airUniversalCreateOneAirline: ofType<{ resource: Airline; router: Router; route: Array<string> }>(),
    airUniversalCreateOneAirlineSuccess: ofType<Airline>(),
    airUniversalCreateOneAirlineFail: ofType<{ id: UniqueId; error: string }>(),
    airUniversalUpdateOneAirline: ofType<{ resource: Airline; router: Router; route: Array<string> }>(),
    airUniversalUpdateOneAirlineSuccess: ofType<Airline>(),
    airUniversalUpdateOneAirlineFail: ofType<{ id: UniqueId; error: string }>(),
    airUniversalDeleteOneAirline: ofType<{ id: UniqueId; router: Router; route: Array<string> }>(),
    airUniversalDeleteOneAirlineSuccess: ofType<UniqueId>(),
    airUniversalDeleteOneAirlineFail: ofType<{ id: UniqueId; error: string }>()
  },
  {
    tag: 'type',
    value: 'payload'
  }
);
export type AirlineAction = UnionOf<typeof airlineActions>;
