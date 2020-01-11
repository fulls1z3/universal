import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { TestingModule } from './testing.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [TestingModule]
  });
});

describe('TestingModule', () => {
  test('should create', () => {
    expect(TestingModule).toBeDefined();
  });
});
