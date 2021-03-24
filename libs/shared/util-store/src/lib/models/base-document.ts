export type UniqueId = string;

export const EMPTY_UNIQUE_ID: UniqueId = '';

export interface BaseDocument {
  id: UniqueId;
}
