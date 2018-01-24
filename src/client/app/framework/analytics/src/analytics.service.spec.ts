// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { cold } from 'jasmine-marbles';
import { Angulartics2 } from 'angulartics2';

// framework
import { t } from '../../testing';

// module
import { Analytics, AnalyticsService } from './analytics.service';
import { AnalyticsModule } from '../analytics.module';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      AnalyticsModule
    ],
    providers: [
      Angulartics2,
      AnalyticsService
    ]
  });
};

class TestAnalytics extends Analytics {
}

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.be(testModuleConfig);

    t.describe('analytics: AnalyticsService', () => {
      t.it('should be able to track',
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

          (t.e(angulartics.eventTrack) as any).toBeObservable(expected);
        }));

      t.it('should be able to track w/devMode: ON',
        t.inject([AnalyticsService, Angulartics2], (analyticsService: AnalyticsService, angulartics: Angulartics2) => {
          // dev mode: shouldn't track anything
          analyticsService.devMode(true);
          analyticsService.track('click', {
            category: 'TEST',
            label: 'Testing'
          });

          t.e((angulartics.eventTrack as any)._events).not
            .toHaveProperty('value');
        }));

      t.it('should be able to pageTrack',
        t.inject([AnalyticsService, Angulartics2], (analyticsService: AnalyticsService, angulartics: Angulartics2) => {
          analyticsService.devMode(false);
          analyticsService.pageTrack('/testing');

          const expected = cold('c', {
            c: {
              path: '/testing'
            }
          });

          (t.e(angulartics.pageTrack) as any).toBeObservable(expected);
        }));

      t.it('should be able to pageTrack w/devMode: ON',
        t.inject([AnalyticsService, Angulartics2], (analyticsService: AnalyticsService, angulartics: Angulartics2) => {
          // dev mode: shouldn't track anything
          analyticsService.devMode(true);
          analyticsService.pageTrack('/testing');

          t.e((angulartics.pageTrack as any)._events).not
            .toHaveProperty('value');
        }));

      t.it('should be able to identify',
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

          (t.e(angulartics.setUserProperties) as any).toBeObservable(expected);
        }));

      t.it('should be able to identify w/devMode: ON',
        t.inject([AnalyticsService, Angulartics2], (analyticsService: AnalyticsService, angulartics: Angulartics2) => {
          // dev mode: shouldn't track anything
          analyticsService.devMode(true);
          analyticsService.identify({
            userId: 1,
            name: 'Test',
            email: 'name@domain.com'
          });

          t.e((angulartics.setUserProperties as any)._events).not
            .toHaveProperty('value');
        }));
    });

    t.describe('analytics: AnalyticsService (base class)',
      () => {
        t.it('should be able to allow descendants to track actions',
          t.inject([AnalyticsService], (analyticsService: AnalyticsService) => {
            t.spyOn(analyticsService, 'track');

            const analytics = new TestAnalytics(analyticsService);
            analytics.category = 'TEST';
            analytics.track('action', {
              category: analytics.category,
              label: 'Testing'
            });

            t.e(analyticsService.track)
              .toHaveBeenCalledWith('action', {
                category: analytics.category,
                label: 'Testing'
              });
          }));
      });
  });
});
