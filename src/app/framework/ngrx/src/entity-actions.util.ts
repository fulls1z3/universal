// libs
import { ofType, unionize } from 'unionize';

// module
import { UniqueId } from './models/unique-id';
import { Router } from '@angular/router';

export const createEntityActions = <T>() => unionize({
  getAll: ofType<boolean>(),
  getAllSuccess: ofType<Array<T>>(),
  getAllFail: ofType<string>(),
  getOne: ofType<{ id: UniqueId }>(),
  getOneSuccess: ofType<T>(),
  getOneFail: ofType<string>(),

  // addMany: {},
  addOne: {},

  // createMany: ofType<Array<T>>(),
  // createManySuccess: ofType<Array<T>>(),
  // createManyFail: ofType<string>(),
  createOne: ofType<{ resource: T, router: Router, route: Array<string> }>(),
  createOneSuccess: ofType<T>(),
  createOneFail: ofType<{ id: UniqueId, error: string}>(),

  // updateMany: ofType<Array<T>>(),
  // updateManySuccess: ofType<Array<T>>(),
  // updateManyFail: ofType<string>(),
  updateOne: ofType<{ resource: T, router: Router, route: Array<string> }>(),
  updateOneSuccess: ofType<T>(),
  updateOneFail: ofType<{ id: UniqueId, error: string}>(),

  // deleteMany: ofType<{ ids: Array<UniqueId> }>(),
  // deleteManySuccess: ofType<Array<UniqueId>>(),
  // deleteManyFail: ofType<string>(),
  deleteOne: ofType<{ id: UniqueId, router: Router, route: Array<string>}>(),
  deleteOneSuccess: ofType<UniqueId>(),
  deleteOneFail: ofType<{ id: UniqueId, error: string}>(),

  clear: {}
}, {
  tag: 'type',
  value: 'payload'
});
