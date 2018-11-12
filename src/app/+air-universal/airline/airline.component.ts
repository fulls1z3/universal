// angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// libs
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

// app
import { BaseContainerComponent } from '~/app/framework/core';
import { columnFactory, DataTableColumn, DataTableLinkButton, DataTableOptions, linkButtonFactory } from '~/app/shared/data-table';
import { Airline, airlineActions, AirlineSelectors, State } from '~/app/store';
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.scss'],
  animations: [routeAnimation]
})
export class AirlineComponent extends BaseContainerComponent implements OnInit {
  airlines$: Observable<Array<Airline>>;
  cols: Array<DataTableColumn>;
  filterCol: string;
  buttons: Array<DataTableLinkButton>;
  options: DataTableOptions;
  baseRoute: Array<any>;

  constructor(private readonly router: Router,
              protected readonly store$: Store<State>) {
    super(store$);
  }

  ngOnInit(): void {
    this.cols = [
      columnFactory('_id', 'PUBLIC.AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.ID_COL_TITLE'),
      columnFactory('iataCode', 'PUBLIC.AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.IATA_CODE_COL_TITLE'),
      columnFactory('name', 'PUBLIC.AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.NAME_COL_TITLE')
    ];

    this.filterCol = 'name';
    this.baseRoute = ['/', 'air-universal', 'airlines'];
    this.buttons = [linkButtonFactory(this.baseRoute, '_id', 'PUBLIC.SHARED.ACTION.EDIT', 'edit')];
    this.options = {
      title: 'PUBLIC.AIR_UNIVERSAL.AIRLINE.AIRLINE_TABLE.TITLE',
      scrollable: 'full'
    };

    this.isProcessing$ = this.store$
      .pipe(select(AirlineSelectors.getIsProcessing));
    this.error$ = this.store$
      .pipe(select(AirlineSelectors.getError));
    this.airlines$ = this.store$
      .pipe(select(AirlineSelectors.getAll));

    this.store$.dispatch(airlineActions.airUniversalGetAllAirlines());
  }

  createAirline(): void {
    this.router.navigate([...this.baseRoute, 'create']);
  }

  refresh(): void {
    this.store$.dispatch(airlineActions.airUniversalGetAllAirlines());
  }
}
