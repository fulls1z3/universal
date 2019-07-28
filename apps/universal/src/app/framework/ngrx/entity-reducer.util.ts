import { BaseDocument, UniqueId } from './models/base-document';

export const entityStartProcessingFn = <T>(state: T) => ({
  ...(state as any),
  ids: [],
  entities: {},
  isProcessing: true,
  selectedId: undefined
});

export const entityStopProcessingFn = <T>(state: T) => ({
  ...(state as any),
  isProcessing: false
});

export const entityErrorFn = <T>(state: T) => (error: string) => ({
  ...(state as any),
  ids: [],
  entities: {},
  isProcessing: false,
  selectedId: undefined,
  error
});

export const entityResetFn = <T>(state: T) => (value: { id: UniqueId; error: string }) => ({
  ...(state as any),
  isProcessing: false,
  selectedId: value.id,
  error: value.error
});

export const entityReducer = <T extends BaseDocument>(acc: any, cur: T) => ({
  ...acc,
  [cur._id]: cur
});
