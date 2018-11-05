// angular
import { Router } from '@angular/router';

// libs
import { ofType, unionize, UnionOf } from 'unionize';

// module
import { Airline } from './airline.model';

// framework
import { UniqueId } from '~/app/framework/ngrx';

export const airlineActions = unionize({
  getAllAirlines: {},
  getAllAirlinesSuccess: ofType<Array<Airline>>(),
  getAllAirlinesFail: ofType<string>(),
  getOneAirline: ofType<UniqueId>(),
  getOneAirlineSuccess: ofType<Airline>(),
  getOneAirlineFail: ofType<string>(),
  addOneAirline: {},
  createOneAirline: ofType<{ resource: Airline, router: Router, route: Array<string> }>(),
  createOneAirlineSuccess: ofType<Airline>(),
  createOneAirlineFail: ofType<{ id: UniqueId, error: string}>(),
  updateOneAirline: ofType<{ resource: Airline, router: Router, route: Array<string> }>(),
  updateOneAirlineSuccess: ofType<Airline>(),
  updateOneAirlineFail: ofType<{ id: UniqueId, error: string}>(),
  deleteOneAirline: ofType<{ id: UniqueId, router: Router, route: Array<string>}>(),
  deleteOneAirlineSuccess: ofType<UniqueId>(),
  deleteOneAirlineFail: ofType<{ id: UniqueId, error: string}>()
}, {
  tag: 'type',
  value: 'payload'
});
export type AirlineAction = UnionOf<typeof airlineActions>;
