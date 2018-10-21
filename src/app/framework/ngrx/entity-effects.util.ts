// libs
import { of as observableOf } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { flow, get, isEmpty, isNil } from 'lodash/fp';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

// shared
import { ERR__NO_PAYLOAD } from '~/app/shared';

// module
import { BaseDocument } from './models/base-document';
import { BaseEntityService } from './base-entity.service';

// TODO: cancel load?
export const getAll$ = <T extends BaseDocument, S>(actions$: Actions,
                                                   service: BaseEntityService<T>,
                                                   actions: any,
                                                   store$: Store<S>,
                                                   selector: string) => actions$.pipe(
  filter(actions.is.getAll),
  withLatestFrom(store$.select(state => state[selector])),
  switchMap(([action, state]) => {
    const entities = flow(
      get('entities'),
      Object.values
    )(state);

    return !get('payload')(action) && !isEmpty(entities)
      ? observableOf(actions.getAllSuccess(entities))
      : service.getAll$()
        .pipe(
          map(actions.getAllSuccess),
          catchError(err => observableOf(actions.getAllFail(err.message)))
        );
  })
);

export const getOne$ = <T extends BaseDocument>(actions$: Actions, service: BaseEntityService<T>, actions: any) => actions$.pipe(
  filter(actions.is.getOne),
  map(get('payload')),
  switchMap(payload => !isNil(payload)
    ? service.get$(payload)
      .pipe(
        map(actions.getOneSuccess),
        catchError(err => observableOf(actions.getOneFail(err.message)))
      )
    : observableOf(actions.getAllFail(ERR__NO_PAYLOAD.message)))
);
