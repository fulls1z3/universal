// libs;
import { UnionOf } from 'unionize';

// framework
import { createEntityActions } from '~/app/framework/ngrx';

// module
import { Airline } from './airline.model';

export const airlineActions = createEntityActions<Airline>();
export type AirlineAction = UnionOf<typeof airlineActions>;
