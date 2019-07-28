import { FrameworkState } from '../framework/store';

import { AirUniversalState } from './air-universal';

export interface State extends FrameworkState {
  airUniversal: AirUniversalState;
}
