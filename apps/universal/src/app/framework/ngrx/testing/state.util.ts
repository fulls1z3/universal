import { BaseDocument } from '../models/base-document';

export const getState = <T extends BaseDocument>(featureName: string, item?: T) => ({
  [featureName]: item
    ? {
        ids: [item._id],
        entities: {
          [item._id]: item
        },
        selectedId: item._id
      }
    : {
        ids: [],
        entities: {},
        selectedId: undefined
      }
});
