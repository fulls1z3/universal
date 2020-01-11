import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { AirUniversalStoreModule } from './air-universal-store.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [AirUniversalStoreModule]
  });
});

describe('AirUniversalStoreModule', () => {
  test('should create', () => {
    expect(AirUniversalStoreModule).toBeDefined();
  });
});
