import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { RouterTestingModule } from './router-testing.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule]
  });
});

describe('RouterTestingModule', () => {
  test('should create', () => {
    expect(RouterTestingModule).toBeDefined();
  });
});
