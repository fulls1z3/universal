import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { BaseModule } from './base.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [BaseModule]
  });
});

describe('BaseModule', () => {
  test('should create', () => {
    expect(BaseModule).toBeDefined();
  });
});
