import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { CoreModule } from './core.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [CoreModule]
  });
});

describe('CoreModule', () => {
  test('should create', () => {
    expect(CoreModule).toBeDefined();
  });
});
