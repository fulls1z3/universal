// angular
import { Injectable } from '@angular/core';

// libs
import { of as observableOf } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { get, isNil } from 'lodash/fp';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

// framework
import { getAll$, getOne$ } from '~/app/framework/ngrx';

// shared
import { ERR__NO_PAYLOAD } from '~/app/shared';

// module
import { airlineActions } from './airline.actions';
import { Airline } from './airline.model';
import { AirlineService } from './airline.service';
import { AIRLINE, State } from './airline.state';

@Injectable()
export class AirlineEffects {
  @Effect() getAll$ = getAll$<Airline, State>(this.actions$, this.airline, airlineActions, this.store$, AIRLINE);
  @Effect() getOne$ = getOne$<Airline>(this.actions$, this.airline, airlineActions);

  @Effect() createOne$ = this.actions$
    .pipe(
      filter(airlineActions.is.createOne),
      map(get('payload')),
      switchMap(payload => this.airline.createOne$(payload.resource)
        .pipe(
          map(airlineActions.createOneSuccess),
          tap(() => payload.router.navigate(payload.route)),
          catchError(err => observableOf(airlineActions.createOneFail(err)))
        ))
    );

  @Effect() updateOne$ = this.actions$
    .pipe(
      filter(airlineActions.is.updateOne),
      map(get('payload')),
      switchMap(payload => !isNil(payload.resource._id)
        ? this.airline.updateOne$(payload.resource)
          .pipe(
            map(airlineActions.updateOneSuccess),
            tap(() => payload.router.navigate(payload.route)),
            catchError(err => observableOf(airlineActions.updateOneFail(err)))
          )
        : observableOf(airlineActions.updateOneFail({id: payload.resource._id, error: ERR__NO_PAYLOAD.message})))
    );

  @Effect() deleteOne$ = this.actions$
    .pipe(
      filter(airlineActions.is.deleteOne),
      map(get('payload')),
      switchMap(payload => !isNil(payload.id)
        ? this.airline.deleteOne$(payload.id)
          .pipe(
            map(airlineActions.deleteOneSuccess),
            tap(() => payload.router.navigate(payload.route)),
            catchError(err => observableOf(airlineActions.deleteOneFail(err)))
          )
        : observableOf(airlineActions.deleteOneFail({id: payload.id, error: ERR__NO_PAYLOAD.message})))
    );

  constructor(private readonly actions$: Actions,
              private readonly airline: AirlineService,
              private readonly store$: Store<State>) {
  }
}
