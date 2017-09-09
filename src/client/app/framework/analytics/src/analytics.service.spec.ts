// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { Angulartics2, Angulartics2Segment } from 'angulartics2';

// framework
import { t } from '../../testing';

// module
import { Analytics, AnalyticsService } from './analytics.service';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
      Angulartics2,
      Angulartics2Segment,
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
        t.inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
          analyticsService.devMode(false);

          t.spyOn(segment, 'eventTrack');

          analyticsService.track('click', {
            category: 'TEST',
            label: 'Testing'
          });

          t.e(segment.eventTrack).toHaveBeenCalledWith('click', {
            category: 'TEST',
            label: 'Testing'
          });
        }));

      t.it('should be able to track w/devMode: ON',
        t.inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
          t.spyOn(segment, 'eventTrack');

          // dev mode: shouldn't track anything
          analyticsService.devMode(true);
          analyticsService.track('click', {
            category: 'TEST',
            label: 'Testing'
          });

          t.e(segment.eventTrack).not.toHaveBeenCalled();
        }));

      t.it('should be able to pageTrack',
        t.inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
          t.spyOn(segment, 'pageTrack');

          analyticsService.pageTrack('/testing', {});

          t.e(segment.pageTrack).toHaveBeenCalledWith('/testing', {});
        }));

      t.it('should be able to pageTrack w/devMode: ON',
        t.inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
          t.spyOn(segment, 'pageTrack');

          // dev mode: shouldn't track anything
          analyticsService.devMode(true);
          analyticsService.pageTrack('/testing', {});

          t.e(segment.pageTrack).not.toHaveBeenCalled();
        }));

      t.it('should be able to identify',
        t.inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
          t.spyOn(segment, 'setUserProperties');

          analyticsService.identify({
            userId: 1,
            name: 'Test',
            email: 'name@domain.com'
          });

          t.e(segment.setUserProperties)
            .toHaveBeenCalledWith({
              userId: 1,
              name: 'Test',
              email: 'name@domain.com'
            });
        }));

      t.it('should be able to identify w/devMode: ON',
        t.inject([AnalyticsService, Angulartics2Segment], (analyticsService: any, segment: any) => {
          t.spyOn(segment, 'setUserProperties');

          // dev mode: shouldn't track anything
          analyticsService.devMode(true);
          analyticsService.identify({
            userId: 1,
            name: 'Test',
            email: 'name@domain.com'
          });

          t.e(segment.setUserProperties).not.toHaveBeenCalled();
        }));
    });

    t.describe('analytics: AnalyticsService (base class)',
      () => {
        t.it('should be able to allow descendants to track actions',
          t.inject([AnalyticsService, Angulartics2Segment], (analyticsService: any) => {
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
