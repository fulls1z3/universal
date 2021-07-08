export const AUTH = 'account--auth';

export interface State {
  isProcessing?: boolean;
  error?: string;
}

export const initialState: State = {
  isProcessing: false,
  error: undefined
};
