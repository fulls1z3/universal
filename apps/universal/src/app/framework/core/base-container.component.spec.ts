import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';

import { NgrxTestingModule } from '../ngrx/testing';

import { BaseContainerComponent } from './base-container.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [NgrxTestingModule],
    declarations: [BaseContainerComponent]
  });
});

describe('BaseContainerComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(BaseContainerComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });
});
