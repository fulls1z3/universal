import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { flow, get, isEmpty, isNil, negate } from 'lodash/fp';
import { of as observableOf } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';
import { ERROR__NO_PAYLOAD } from '~/app/shared';

import { airlineActions } from './airline.actions';
import { AirlineService } from './airline.service';

@Injectable()
export class AirlineEffects {
  @Effect() getMany$ = this.actions$.pipe(
    filter(airlineActions.is.airUniversalGetManyAirlines),
    switchMap(() =>
      this.airline.getMany$().pipe(
        map(airlineActions.airUniversalGetManyAirlinesSuccess),
        catchError(error => observableOf(airlineActions.airUniversalGetManyAirlinesFail(error.message)))
      )
    )
  );

  @Effect() getOne$ = this.actions$.pipe(
    filter(airlineActions.is.airUniversalGetOneAirline),
    map(get('payload')),
    switchMap(payload =>
      !isEmpty(payload)
        ? this.airline.getOne$(payload).pipe(
            map(airlineActions.airUniversalGetOneAirlineSuccess),
            catchError(error => observableOf(airlineActions.airUniversalGetOneAirlineFail(error.message)))
          )
        : observableOf(airlineActions.airUniversalGetOneAirlineFail(ERROR__NO_PAYLOAD.message))
    )
  );

  @Effect() createOne$ = this.actions$.pipe(
    filter(airlineActions.is.airUniversalCreateOneAirline),
    map(get('payload')),
    switchMap(payload =>
      flow(
        get('resource'),
        negate(isNil)
      )(payload)
        ? this.airline.createOne$(payload.resource).pipe(
            map(airlineActions.airUniversalCreateOneAirlineSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                airlineActions.airUniversalCreateOneAirlineFail({
                  id: EMPTY_UNIQUE_ID,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
            airlineActions.airUniversalCreateOneAirlineFail({
              id: EMPTY_UNIQUE_ID,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  @Effect() updateOne$ = this.actions$.pipe(
    filter(airlineActions.is.airUniversalUpdateOneAirline),
    map(get('payload')),
    switchMap(payload =>
      flow(
        get('_id'),
        negate(isNil)
      )(payload.resource)
        ? this.airline.updateOne$(payload.resource).pipe(
            map(airlineActions.airUniversalUpdateOneAirlineSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                airlineActions.airUniversalUpdateOneAirlineFail({
                  id: payload.resource._id,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
            airlineActions.airUniversalUpdateOneAirlineFail({
              id: EMPTY_UNIQUE_ID,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  @Effect() deleteOne$ = this.actions$.pipe(
    filter(airlineActions.is.airUniversalDeleteOneAirline),
    map(get('payload')),
    switchMap(payload =>
      !isNil(payload.id)
        ? this.airline.deleteOne$(payload.id).pipe(
            map(airlineActions.airUniversalDeleteOneAirlineSuccess),
            tap(async () => payload.router.navigate(payload.route)),
            catchError(error =>
              observableOf(
                airlineActions.airUniversalDeleteOneAirlineFail({
                  id: payload.id,
                  error: error.message
                })
              )
            )
          )
        : observableOf(
            airlineActions.airUniversalDeleteOneAirlineFail({
              id: payload.id,
              error: ERROR__NO_PAYLOAD.message
            })
          )
    )
  );

  constructor(private readonly actions$: Actions, private readonly airline: AirlineService) {}
}
