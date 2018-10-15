// framework
import { UniqueId } from '~/app/framework/ngrx';

export const startProcessingFn = <T>(state: T) => ({...(state as any), isProcessing: true, selectedId: undefined});
export const stopProcessingFn = <T>(state: T) => ({...(state as any), isProcessing: false});
export const errorFn = <T>(state: T) => (error: string) => ({...(state as any), isProcessing: false, selectedId: undefined, error});
export const resetFn = <T>(state: T) =>
  (value: { id: UniqueId, error: string }) => ({...(state as any), isProcessing: false, selectedId: value.id, error: value.error});
