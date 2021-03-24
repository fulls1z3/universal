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

  track(action: string, properties: AnalyticsProperties) {
    if (!this.devMode()) {
      this.angulartics.eventTrack.next({
        action,
        properties
      });
    }
  }

  pageTrack(path: string) {
    if (!this.devMode()) {
      this.angulartics.pageTrack.next({ path });
    }
  }

  identify(properties) {
    if (!this.devMode()) {
      this.angulartics.setUserProperties.next(properties);
    }
  }

  devMode(enable?: boolean) {
    if (typeof enable !== 'undefined') {
      this.angulartics.settings.developerMode = enable;
    }

    return this.angulartics.settings.developerMode;
  }
}

@Injectable()
export class Analytics {
  readonly category: string;

  constructor(@Inject(AnalyticsService) public analytics: AnalyticsService, category: string) {
    this.category = category;
  }

  track(action: string, properties: AnalyticsProperties) {
    this.analytics.track(action, extend({ category: this.category })(properties));
  }
}
