import { TestBed } from '@angular/core/testing';
import { StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { configureTestSuite } from 'ng-bullet';

import { BaseContainerComponent } from './base-container.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [StoreTestingModule],
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
