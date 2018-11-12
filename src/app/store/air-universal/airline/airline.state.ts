// libs
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// app
import { UniqueId } from '~/app/framework/ngrx';

// module
import { Airline } from './airline.model';

export const AIRLINE = 'flight--airline';

export interface State extends EntityState<Airline> {
  selectedId: UniqueId;
  isProcessing?: boolean;
  error?: any;
}

export const adapter: EntityAdapter<Airline> = createEntityAdapter<Airline>({
  selectId: cur => cur._id
});

export const initialState: State = adapter.getInitialState({
  selectedId: undefined,
  isProcessing: false,
  error: undefined
});
