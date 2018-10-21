// framework
import { UniqueId } from '~/app/framework/ngrx';

export const entityStartProcessingFn = <T>(state: T) => ({...(state as any), isProcessing: true, selectedId: undefined});
export const entityStopProcessingFn = <T>(state: T) => ({...(state as any), isProcessing: false});
export const entityErrorFn = <T>(state: T) => (error: string) => ({...(state as any), isProcessing: false, selectedId: undefined, error});
export const entityResetFn = <T>(state: T) =>
  (value: { id: UniqueId, error: string }) => ({...(state as any), isProcessing: false, selectedId: value.id, error: value.error});
