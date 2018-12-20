import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2 } from 'angulartics2';
import { cold } from 'jasmine-marbles';
import { t } from '~/app/framework/testing';

import { AnalyticsModule } from './analytics.module';
import { Analytics, AnalyticsService } from './analytics.service';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, AnalyticsModule],
    providers: [Angulartics2, AnalyticsService]
  });
};

class TestAnalytics extends Analytics {}

t.describe('AnalyticsService', () => {
  t.be(() => {
    testModuleConfig();
  });

  t.it(
    'should track',
    t.inject([AnalyticsService, Angulartics2], (analyticsService: AnalyticsService, angulartics: Angulartics2) => {
      analyticsService.devMode(false);
      analyticsService.track('click', {
        category: 'TEST',
        label: 'Testing'
      });

      const expected = cold('c', {
        c: {
          action: 'click',
          properties: {
            category: 'TEST',
            label: 'Testing'
          }
        }
      });

      t.e(angulartics.eventTrack).toBeObservable(expected);
    })
  );

  t.it(
    'should track w/devMode: ON',
    t.inject([AnalyticsService, Angulartics2], (analyticsService: AnalyticsService, angulartics: Angulartics2) => {
      // dev mode: shouldn't track anything
      analyticsService.devMode(true);
      analyticsService.track('click', {
        category: 'TEST',
        label: 'Testing'
      });

      t.e((angulartics.eventTrack as any)._events).not.toHaveProperty('value');
    })
  );

  t.it(
    'should pageTrack',
    t.inject([AnalyticsService, Angulartics2], (analyticsService: AnalyticsService, angulartics: Angulartics2) => {
      analyticsService.devMode(false);
      analyticsService.pageTrack('/testing');

      const expected = cold('c', {
        c: {
          path: '/testing'
        }
      });

      t.e(angulartics.pageTrack).toBeObservable(expected);
    })
  );

  t.it(
    'should pageTrack w/devMode: ON',
    t.inject([AnalyticsService, Angulartics2], (analyticsService: AnalyticsService, angulartics: Angulartics2) => {
      // dev mode: shouldn't track anything
      analyticsService.devMode(true);
      analyticsService.pageTrack('/testing');

      t.e((angulartics.pageTrack as any)._events).not.toHaveProperty('value');
    })
  );

  t.it(
    'should identify',
    t.inject([AnalyticsService, Angulartics2], (analyticsService: AnalyticsService, angulartics: Angulartics2) => {
      analyticsService.devMode(false);
      analyticsService.identify({
        userId: 1,
        name: 'Test',
        email: 'name@domain.com'
      });

      const expected = cold('c', {
        c: {
          userId: 1,
          name: 'Test',
          email: 'name@domain.com'
        }
      });

      t.e(angulartics.setUserProperties).toBeObservable(expected);
    })
  );

  t.it(
    'should identify w/devMode: ON',
    t.inject([AnalyticsService, Angulartics2], (analyticsService: AnalyticsService, angulartics: Angulartics2) => {
      // dev mode: shouldn't track anything
      analyticsService.devMode(true);
      analyticsService.identify({
        userId: 1,
        name: 'Test',
        email: 'name@domain.com'
      });

      t.e((angulartics.setUserProperties as any)._events).not.toHaveProperty('value');
    })
  );
});

t.describe('AnalyticsService (base class)', () => {
  t.be(() => {
    testModuleConfig();
  });

  t.it(
    'should allow descendants to track actions',
    t.inject([AnalyticsService], (analyticsService: AnalyticsService) => {
      const spy = t.spyOn(analyticsService, 'track');

      const analytics = new TestAnalytics(analyticsService);
      analytics.category = 'TEST';
      analytics.track('action', {
        category: analytics.category,
        label: 'Testing'
      });

      t.e(spy).toHaveBeenCalledWith('action', {
        category: analytics.category,
        label: 'Testing'
      });
    })
  );
});
