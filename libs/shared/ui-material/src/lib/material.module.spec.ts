import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { MaterialModule } from './material.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [MaterialModule]
  });
});

describe('MaterialModule', () => {
  test('should create', () => {
    expect(MaterialModule).toBeDefined();
  });
});
