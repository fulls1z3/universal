// app
import { FrameworkState } from '~/app/framework/store';

// module
import { AirUniversalState } from './air-universal';

export interface State extends FrameworkState {
  airUniversal: AirUniversalState;
}
