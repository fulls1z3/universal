import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { AnalyticsModule } from './analytics.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [AnalyticsModule]
  });
});

describe('AnalyticsModule', () => {
  test('should create', () => {
    expect(AnalyticsModule).toBeDefined();
  });
});
