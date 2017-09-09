// angular
import { Inject, Injectable } from '@angular/core';

// libs
import * as _ from 'lodash';
import { Angulartics2, Angulartics2Segment } from 'angulartics2';

export interface AnalyticsProperties {
  category?: string;
  label?: string;
  value?: number;
}

export interface IAnalytics {
  track(action: string, properties: AnalyticsProperties): void;
}

@Injectable()
export class AnalyticsService implements IAnalytics {
  constructor(private readonly angulartics: Angulartics2,
              private readonly segment: Angulartics2Segment) {
    // options
    // https://github.com/angulartics/angulartics2/blob/master/src/core/angulartics2.ts#L90-L104
    // angulartics2.virtualPageviews(value: boolean);
    // angulartics2.excludeRoutes(routes: Array<string>);
    // angulartics2.firstPageview(value: boolean);
    // angulartics2.withBase(value: string);

    this.devMode(false);
  }

  track(action: string, properties: AnalyticsProperties): void {
    if (!this.devMode())
      this.segment.eventTrack(action, properties);
  }

  pageTrack(path: string, location: any): void {
    if (!this.devMode())
      this.segment.pageTrack(path, location);
  }

  identify(properties: any): void {
    if (!this.devMode())
      this.segment.setUserProperties(properties);
  }

  devMode(enable?: boolean): boolean {
    if (typeof enable !== 'undefined')
      this.angulartics.developerMode(enable);

    return this.angulartics.settings.developerMode;
  }
}

export class Analytics implements IAnalytics {
  category: string;

  constructor(@Inject(AnalyticsService) public analytics: AnalyticsService) {
  }

  track(action: string, properties: AnalyticsProperties): void {
    this.analytics.track(action, _.extend(properties, {category: this.category}));
  }
}
