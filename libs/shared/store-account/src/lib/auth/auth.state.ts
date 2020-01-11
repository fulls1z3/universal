export const AUTH = 'account--auth';

export interface State {
  isProcessing?: boolean;
  error?: any;
}

export const initialState: State = {
  isProcessing: false,
  error: undefined
};
