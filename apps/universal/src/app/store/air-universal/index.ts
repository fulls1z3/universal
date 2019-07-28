import * as AirlineSelectors from './airline/airline.selectors';

export { airlineActions } from './airline/airline.actions';
export * from './airline/airline.model';
export { AIRLINE } from './airline/airline.state';
export { AirlineSelectors };

export { AirUniversalModule as AirUniversalStoreModule } from './air-universal.module';
export { State as AirUniversalState } from './air-universal.state';
