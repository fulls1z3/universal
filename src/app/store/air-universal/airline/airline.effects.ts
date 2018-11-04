// angular
import { Injectable } from '@angular/core';

// libs
import { of as observableOf } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { flow, get, isEmpty, isNil, negate } from 'lodash/fp';
import { Actions, Effect } from '@ngrx/effects';

// framework
import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';

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
      return this.airline.getMany$()
        .pipe(
          map(airlineActions.getAllAirlinesSuccess),
          catchError(error => observableOf(airlineActions.getAllAirlinesFail(error.message)))
        );
    })
  );

  @Effect() getOne$ = this.actions$.pipe(
    filter(airlineActions.is.getOneAirline),
    map(get('payload')),
    switchMap(payload => !isEmpty(payload)
      ? this.airline.getOne$(payload)
        .pipe(
          map(airlineActions.getOneAirlineSuccess),
          catchError(error => observableOf(airlineActions.getOneAirlineFail(error.message)))
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
          catchError(error => observableOf(airlineActions.createOneAirlineFail({id: EMPTY_UNIQUE_ID, error: error.message})))
        ))
    );

  @Effect() updateOne$ = this.actions$
    .pipe(
      filter(airlineActions.is.updateOneAirline),
      map(get('payload')),
      switchMap(payload => flow(get('_id'), negate(isNil))(payload.resource)
        ? this.airline.updateOne$(payload.resource)
          .pipe(
            map(airlineActions.updateOneAirlineSuccess),
            tap(() => payload.router.navigate(payload.route)),
            catchError(error => observableOf(airlineActions.updateOneAirlineFail({id: payload.resource._id, error: error.message})))
          )
        : observableOf(airlineActions.updateOneAirlineFail({id: EMPTY_UNIQUE_ID, error: ERR__NO_PAYLOAD.message})))
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
            catchError(error => observableOf(airlineActions.deleteOneAirlineFail({id: payload.id, error: error.message})))
          )
        : observableOf(airlineActions.deleteOneAirlineFail({id: payload.id, error: ERR__NO_PAYLOAD.message})))
    );

  constructor(private readonly actions$: Actions,
              private readonly airline: AirlineService) {
  }
}
