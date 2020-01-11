import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { AccountStoreModule } from './account-store.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [AccountStoreModule]
  });
});

describe('AccountStoreModule', () => {
  test('should create', () => {
    expect(AccountStoreModule).toBeDefined();
  });
});
