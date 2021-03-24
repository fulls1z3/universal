export const startProcessingFn = <T>(state: T) => ({
  ...state,
  isProcessing: true,
  selectedItem: undefined
});
export const stopProcessingFn = <T>(state: T) => ({
  ...state,
  isProcessing: false
});
export const errorFn =
  <T>(state: T) =>
  (error: string) => ({
    ...state,
    isProcessing: false,
    selectedItem: undefined,
    error
  });
