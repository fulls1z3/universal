import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { getOr, isNil } from 'lodash/fp';
import { Observable, of as observableOf, zip } from 'rxjs';
import { skipWhile, switchMap, takeUntil } from 'rxjs/operators';
import { BaseContainerComponent } from '~/app/framework/core';
import { UniqueId } from '~/app/framework/ngrx';
import { RenderFlag, routeAnimation } from '~/app/shared';
import { Airline, airlineActions, AirlineSelectors, State } from '~/app/store';

@Component({
  templateUrl: './airline-detail-container.component.html',
  styleUrls: ['./airline-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimation]
})
export class AirlineDetailContainerComponent extends BaseContainerComponent implements OnInit {
  airline$: Observable<Airline>;
  baseRoute: Array<string>;

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
    this.baseRoute = ['/', 'air-universal', 'airlines'];

    this.isProcessing$ = this.store$.pipe(select(AirlineSelectors.getIsProcessing));
    this.error$ = this.store$.pipe(select(AirlineSelectors.getError));
    this.airline$ = this.store$.pipe(select(AirlineSelectors.getSelected));

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

  delete(id: UniqueId): void {
    this.store$.dispatch(
      airlineActions.airUniversalDeleteOneAirline({
        id,
        router: this.router,
        route: this.baseRoute
      })
    );
  }

  save(resource: any): void {
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
