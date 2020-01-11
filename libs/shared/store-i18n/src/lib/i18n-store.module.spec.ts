import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { I18NStoreModule } from './i18n-store.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [I18NStoreModule]
  });
});

describe('I18NStoreModule', () => {
  test('should create', () => {
    expect(I18NStoreModule).toBeDefined();
  });
});
