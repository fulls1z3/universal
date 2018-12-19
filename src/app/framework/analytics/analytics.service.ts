import { Inject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import { extend } from 'lodash/fp';

interface AnalyticsProperties {
  category?: string;
  label?: string;
  value?: number;
}

@Injectable()
export class AnalyticsService {
  constructor(private readonly angulartics: Angulartics2) {
    this.devMode(false);
  }

  track(action: string, properties: AnalyticsProperties): void {
    if (!this.devMode()) {
      this.angulartics.eventTrack.next({
        action,
        properties
      });
    }
  }

  pageTrack(path: string): void {
    if (!this.devMode()) {
      this.angulartics.pageTrack.next({ path });
    }
  }

  identify(properties: any): void {
    if (!this.devMode()) {
      this.angulartics.setUserProperties.next(properties);
    }
  }

  devMode(enable?: boolean): boolean {
    if (typeof enable !== 'undefined') {
      this.angulartics.settings.developerMode = enable;
    }

    return this.angulartics.settings.developerMode;
  }
}

export class Analytics {
  category: string;

  constructor(@Inject(AnalyticsService) public analytics: AnalyticsService) {}

  track(action: string, properties: AnalyticsProperties): void {
    this.analytics.track(action, extend({ category: this.category })(properties));
  }
}
