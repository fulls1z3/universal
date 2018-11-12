// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// libs
import { Observable, zip } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { isNil } from 'lodash/fp';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MetaService } from '@ngx-meta/core';

// framework
import { BaseContainerComponent } from '~/app/framework/core';
import { UniqueId } from '~/app/framework/ngrx';

// shared
import { RenderFlag } from '~/app/shared';

// app
import { routeAnimation } from '~/app/app.animations';

// store
import { Airline, airlineActions, AirlineSelectors, State } from '~/app/store';

@Component({
  templateUrl: './airline-detail-container.component.html',
  styleUrls: ['./airline-detail-container.component.scss'],
  animations: [routeAnimation]
})
export class AirlineDetailContainerComponent extends BaseContainerComponent implements OnInit {
  airline$: Observable<Airline>;
  baseRoute: Array<string>;

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly translate: TranslateService,
              private readonly meta: MetaService,
              protected readonly store$: Store<State>) {
    super(store$);
  }

  ngOnInit(): void {
    this.baseRoute = ['/', 'air-universal', 'airlines'];

    this.isProcessing$ = this.store$
      .pipe(select(AirlineSelectors.getIsProcessing));
    this.error$ = this.store$
      .pipe(select(AirlineSelectors.getError));
    this.airline$ = this.store$
      .pipe(select(AirlineSelectors.getSelected));

    this.route.data
      .pipe(
        switchMap(res => zip(
          this.translate.get(res.meta.title),
          this.airline$
            .pipe(filter(cur => !isNil(cur)))
        )),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(([title, res]) => {
        const subTitle = res.name;

        this.meta.setTitle(subTitle ? `${title} - ${subTitle}` : title);
      });

    zip(this.route.data, this.route.params)
      .pipe(
        map(([data, params]) => {
          if (data.renderFlag === RenderFlag.Create)
            return this.store$.dispatch(airlineActions.airUniversalAddOneAirline());

          return this.store$.dispatch(airlineActions.airUniversalGetOneAirline(params.id));
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {/**/
      });
  }

  delete(id: UniqueId): void {
    this.store$.dispatch(airlineActions.airUniversalDeleteOneAirline({
      id,
      router: this.router,
      route: this.baseRoute
    }));
  }

  save(resource: any): void {
    this.route.data
      .pipe(
        map(cur => {
          cur.renderFlag === RenderFlag.Create
            ? this.store$.dispatch(airlineActions.airUniversalCreateOneAirline({
              resource,
              router: this.router,
              route: this.baseRoute
            }))
            : this.store$.dispatch(airlineActions.airUniversalUpdateOneAirline({
              resource,
              router: this.router,
              route: this.baseRoute
            }));
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {/**/
      });
  }
}
