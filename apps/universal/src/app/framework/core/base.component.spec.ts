import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { BaseComponent } from './base.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    declarations: [BaseComponent]
  });
});

describe('BaseComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(BaseComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });
});
