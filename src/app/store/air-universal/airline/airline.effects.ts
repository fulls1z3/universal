// angular
import { Injectable } from '@angular/core';

// libs
import { of as observableOf } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { get, isNil } from 'lodash/fp';
import { Actions, Effect } from '@ngrx/effects';

// shared
import { ERR__NO_PAYLOAD } from '~/app/shared';

// module
import { airlineActions } from './airline.actions';
import { AirlineService } from './airline.service';

@Injectable()
export class AirlineEffects {
  @Effect() getAll$ = this.actions$.pipe(
    filter(airlineActions.is.getAllAirlines),
    switchMap(() => {
      return this.airline.getAll$()
        .pipe(
          map(airlineActions.getAllAirlinesSuccess),
          catchError(err => observableOf(airlineActions.getAllAirlinesFail(err.message)))
        );
    })
  );

  @Effect() getOne$ = this.actions$.pipe(
    filter(airlineActions.is.getOneAirline),
    map(get('payload')),
    switchMap(payload => !isNil(payload)
      ? this.airline.get$(payload)
        .pipe(
          map(airlineActions.getOneAirlineSuccess),
          catchError(err => observableOf(airlineActions.getOneAirlineFail(err.message)))
        )
      : observableOf(airlineActions.getOneAirlineFail(ERR__NO_PAYLOAD.message)))
  );

  @Effect() createOne$ = this.actions$
    .pipe(
      filter(airlineActions.is.createOneAirline),
      map(get('payload')),
      switchMap(payload => this.airline.createOne$(payload.resource)
        .pipe(
          map(airlineActions.createOneAirlineSuccess),
          tap(() => payload.router.navigate(payload.route)),
          catchError(err => observableOf(airlineActions.createOneAirlineFail(err)))
        ))
    );

  @Effect() updateOne$ = this.actions$
    .pipe(
      filter(airlineActions.is.updateOneAirline),
      map(get('payload')),
      switchMap(payload => !isNil(payload.resource._id)
        ? this.airline.updateOne$(payload.resource)
          .pipe(
            map(airlineActions.updateOneAirlineSuccess),
            tap(() => payload.router.navigate(payload.route)),
            catchError(err => observableOf(airlineActions.updateOneAirlineFail(err)))
          )
        : observableOf(airlineActions.updateOneAirlineFail({id: payload.resource._id, error: ERR__NO_PAYLOAD.message})))
    );

  @Effect() deleteOne$ = this.actions$
    .pipe(
      filter(airlineActions.is.deleteOneAirline),
      map(get('payload')),
      switchMap(payload => !isNil(payload.id)
        ? this.airline.deleteOne$(payload.id)
          .pipe(
            map(airlineActions.deleteOneAirlineSuccess),
            tap(() => payload.router.navigate(payload.route)),
            catchError(err => observableOf(airlineActions.deleteOneAirlineFail(err)))
          )
        : observableOf(airlineActions.deleteOneAirlineFail({id: payload.id, error: ERR__NO_PAYLOAD.message})))
    );

  constructor(private readonly actions$: Actions,
              private readonly airline: AirlineService) {
  }
}
