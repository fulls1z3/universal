export type UniqueId = any;

export const EMPTY_UNIQUE_ID: UniqueId = '';

export interface BaseDocument {
  _id: UniqueId;
}
