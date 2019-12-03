import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { getOr, isNil } from 'lodash/fp';
import { Observable, of as observableOf, zip } from 'rxjs';
import { skipWhile, switchMap, takeUntil } from 'rxjs/operators';

import { BaseContainerComponent } from '../../../framework/core';
import { UniqueId } from '../../../framework/ngrx';
import { RenderFlag, routeAnimation } from '../../../shared';
import { Airline, airlineActions, AirlineSelectors, State } from '../../../store';

@Component({
  templateUrl: './airline-detail-container.component.html',
  styleUrls: ['./airline-detail-container.component.scss'],
  animations: [routeAnimation]
})
export class AirlineDetailContainerComponent extends BaseContainerComponent implements OnInit {
  get error$(): Observable<string> {
    return this.store$.pipe(select(AirlineSelectors.getError));
  };

  get isProcessing$(): Observable<boolean> {
    return this.store$.pipe(select(AirlineSelectors.getIsProcessing));
  };

  get baseRoute(): Array<string> {
    return ['/', 'air-universal', 'airlines'];
  };

  get airline$(): Observable<Airline> {
    return this.store$.pipe(select(AirlineSelectors.getSelected));
  }

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly translate: TranslateService,
    private readonly meta: MetaService,
    protected readonly store$: Store<State>
  ) {
    super(store$);
  }

  ngOnInit(): void {
    this.airline$
      .pipe(
        skipWhile(isNil),
        switchMap(res => zip(this.route.data, observableOf(res))),
        switchMap(([data, airline]) => zip(this.translate.get(data.meta.title), observableOf(airline))),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(([title, airline]: Array<any>) => {
        const subtitle = getOr('')('name')(airline);

        this.meta.setTitle(subtitle ? `${title} - ${subtitle}` : title);
      });

    zip(this.route.data, this.route.params)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([data, params]) => {
        if (data.renderFlag === RenderFlag.Create) {
          this.store$.dispatch(airlineActions.airUniversalAddOneAirline());
        } else {
          this.store$.dispatch(airlineActions.airUniversalGetOneAirline(params.id));
        }
      });
  }

  onDeleteClick(id: UniqueId): void {
    this.store$.dispatch(
      airlineActions.airUniversalDeleteOneAirline({
        id,
        router: this.router,
        route: this.baseRoute
      })
    );
  }

  onSaveClick(resource: any): void {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res.renderFlag === RenderFlag.Create) {
        this.store$.dispatch(
          airlineActions.airUniversalCreateOneAirline({
            resource,
            router: this.router,
            route: this.baseRoute
          })
        );
      } else {
        this.store$.dispatch(
          airlineActions.airUniversalUpdateOneAirline({
            resource,
            router: this.router,
            route: this.baseRoute
          })
        );
      }
    });
  }
}
