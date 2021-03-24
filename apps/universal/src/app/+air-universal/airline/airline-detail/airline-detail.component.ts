import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '@fulls1z3/shared/store';
import { Airline, airlineActions, AirlineSelectors } from '@fulls1z3/shared/store-air-universal';
import { routeAnimation } from '@fulls1z3/shared/ui-base';
import { BaseContainerComponent } from '@fulls1z3/shared/ui-store';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { getOr, isNil } from 'lodash/fp';
import { of, Subject, zip } from 'rxjs';
import { map, skipWhile, switchMap, takeUntil } from 'rxjs/operators';

import { RenderFlag } from '../../../shared';

@Component({
  templateUrl: './airline-detail.component.html',
  animations: [routeAnimation]
})
export class AirlineDetailComponent extends BaseContainerComponent implements OnInit {
  readonly resourceReq$ = new Subject<boolean>();

  get error$() {
    return this.store$.pipe(select(AirlineSelectors.getError));
  }

  get isProcessing$() {
    return this.store$.pipe(select(AirlineSelectors.getIsProcessing));
  }

  get renderFlag$() {
    return this.route.data.pipe(map(data => data.renderFlag));
  }

  get airline$() {
    return this.store$.pipe(select(AirlineSelectors.getSelected));
  }

  get title$() {
    return this.renderFlag$.pipe(
      switchMap(renderFlag =>
        renderFlag === RenderFlag.Create
          ? this.translate.get('AIR_UNIVERSAL.AIRLINE.AIRLINE_DETAIL.HEADER.NEW')
          : this.airline$.pipe(map(airline => airline.name))
      )
    );
  }

  get baseRoute() {
    return ['/', 'air-universal', 'airlines'];
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly translate: TranslateService,
    private readonly meta: MetaService,
    protected readonly store$: Store<State>
  ) {
    super(store$);
  }

  ngOnInit() {
    this.airline$
      .pipe(
        skipWhile(isNil),
        switchMap(res => zip(this.route.data, of(res))),
        switchMap(([data, airline]) => zip(this.translate.get(data.meta.title), of(airline))),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(([title, airline]) => {
        const subtitle = getOr('')('name')(airline);

        this.meta.setTitle(subtitle ? `${title} - ${subtitle}` : title);
      });

    zip(this.renderFlag$, this.route.params)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([renderFlag, params]) => {
        if (renderFlag === RenderFlag.Create) {
          this.store$.dispatch(airlineActions.airUniversalAddOneAirline());
        } else {
          this.store$.dispatch(airlineActions.airUniversalGetOneAirline(params.id));
        }
      });
  }

  deleteClick() {
    this.airline$
      .pipe(
        map(airline => airline.id),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(id => {
        if (!isNil(id)) {
          this.store$.dispatch(
            airlineActions.airUniversalDeleteOneAirline({
              id,
              router: this.router,
              route: this.baseRoute
            })
          );
        }
      });
  }

  saveClick() {
    this.resourceReq$.next(true);
    this.cdr.detectChanges();
  }

  saveResource(resource: Airline) {
    this.resourceReq$.next(false);

    this.renderFlag$
      .pipe(
        skipWhile(() => isNil(resource)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(renderFlag => {
        if (renderFlag === RenderFlag.Create) {
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
