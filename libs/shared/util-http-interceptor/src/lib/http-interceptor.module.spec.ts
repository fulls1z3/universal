import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { HttpInterceptorModule } from './http-interceptor.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [HttpInterceptorModule]
  });
});

describe('HttpInterceptorModule', () => {
  test('should create', () => {
    expect(HttpInterceptorModule).toBeDefined();
  });
});
