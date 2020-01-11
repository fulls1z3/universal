import { AuthAction, authActions } from './auth.actions';
import { initialState, State } from './auth.state';

// NOTE: for AoT compilation
// tslint:disable-next-line:only-arrow-functions
export function reducer(state: State = initialState, action: AuthAction): State {
  return authActions.match({
    accountLogin: () => ({ ...state, isProcessing: true, error: undefined }),
    accountLoginSuccess: () => ({ ...state, isProcessing: false, error: undefined }),
    accountLoginFail: (error: string) => ({ ...state, isProcessing: false, error }),
    accountLogout: () => ({ ...state, isProcessing: false, error: undefined }),
    default: () => state
  })(action);
}
