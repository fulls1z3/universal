import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { StoreModule } from './store.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [StoreModule]
  });
});

describe('StoreModule', () => {
  test('should create', () => {
    expect(StoreModule).toBeDefined();
  });
});
