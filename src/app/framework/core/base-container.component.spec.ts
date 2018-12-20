import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { t } from '~/app/framework/testing';

import { BaseContainerComponent } from './base-container.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [NgrxTestingModule],
    declarations: [BaseContainerComponent]
  });
});

t.describe('BaseContainerComponent', () => {
  t.it('should build without a problem', () => {
    const fixture = TestBed.createComponent(BaseContainerComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    t.e(instance).toBeTruthy();
  });
});
