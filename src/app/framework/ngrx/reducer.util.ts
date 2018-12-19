export const startProcessingFn = <T>(state: T) => ({ ...(state as any), isProcessing: true, selectedItem: undefined });
export const stopProcessingFn = <T>(state: T) => ({ ...(state as any), isProcessing: false });
export const errorFn = <T>(state: T) => (error: string) => ({ ...(state as any), isProcessing: false, selectedItem: undefined, error });
