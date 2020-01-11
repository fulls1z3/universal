import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { I18NModule } from './i18n.module';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [I18NModule]
  });
});

describe('I18NModule', () => {
  test('should create', () => {
    expect(I18NModule).toBeDefined();
  });
});
