import { AuthAction, authActions } from './auth.actions';
import { initialState, State } from './auth.state';

export function reducer(state: State = initialState, action: AuthAction) {
  return authActions.match({
    accountLogin: () => ({
      ...state,
      isProcessing: true,
      error: undefined
    }),
    accountLoginSuccess: () => ({
      ...state,
      isProcessing: false,
      error: undefined
    }),
    accountLoginFail: (error: string) => ({
      ...state,
      isProcessing: false,
      error
    }),
    accountLogout: () => ({
      ...state,
      isProcessing: false,
      error: undefined
    }),
    default: () => ({
      ...state,
      isProcessing: false,
      error: undefined
    })
  })(action);
}
