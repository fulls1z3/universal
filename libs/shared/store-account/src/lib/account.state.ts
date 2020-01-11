import { State as AuthState } from './auth/auth.state';

export interface State {
  auth: AuthState;
}
