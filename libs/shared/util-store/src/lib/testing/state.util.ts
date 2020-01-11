import { BaseDocument } from '../models/base-document';

export const getState = <T extends BaseDocument>(featureName: string, item?: T) => ({
  [featureName]: item
    ? {
        ids: [item.id],
        entities: {
          [item.id]: item
        },
        selectedId: item.id
      }
    : {
        ids: [],
        entities: {},
        selectedId: undefined
      }
});
