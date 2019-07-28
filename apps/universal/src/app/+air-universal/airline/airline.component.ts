import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { from as observableFrom, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseContainerComponent } from '../../framework/core';
import { routeAnimation, Scrollable } from '../../shared';
import { createColumn, createOptions, createRouteButton, DataTable } from '../../shared/data-table';
import { Airline, airlineActions, AirlineSelectors, State } from '../../store';

@Component({
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.scss'],
  animations: [routeAnimation]
})
export class AirlineComponent extends BaseContainerComponent implements OnInit {
  airlines$: Observable<Array<Airline>>;
  baseRoute: Array<any>;
  airlineTable: DataTable;

  constructor(private readonly router: Router, protected readonly store$: Store<State>) {
    super(store$);
  }

  ngOnInit(): void {
    this.baseRoute = ['/', 'air-universal', 'airlines'];

    this.airlineTable = {
      cols: [
        createColumn('_id', 'AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.ID_COL_TITLE'),
        createColumn('iataCode', 'AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.IATA_CODE_COL_TITLE'),
        createColumn('name', 'AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.NAME_COL_TITLE')
      ],
      filterCol: 'name',
      buttons: [createRouteButton('', 'edit', 'SHARED.ACTION.EDIT', this.baseRoute, '_id')],
      options: createOptions('', 'AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.TITLE', Scrollable.Full)
    };

    this.isProcessing$ = this.store$.pipe(select(AirlineSelectors.getIsProcessing));
    this.error$ = this.store$.pipe(select(AirlineSelectors.getError));
    this.airlines$ = this.store$.pipe(select(AirlineSelectors.getMany));

    this.store$.dispatch(airlineActions.airUniversalGetManyAirlines());
  }

  createAirline(): void {
    observableFrom(this.router.navigate([...this.baseRoute, 'create']))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        /**/
      });
  }

  refresh(): void {
    this.store$.dispatch(airlineActions.airUniversalGetManyAirlines());
  }
}
