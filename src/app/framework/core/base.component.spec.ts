import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { t } from '~/app/framework/testing';

import { BaseComponent } from './base.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    declarations: [BaseComponent]
  });
});

t.describe('BaseComponent', () => {
  t.it('should build without a problem', () => {
    const fixture = TestBed.createComponent(BaseComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    t.e(instance).toBeTruthy();
  });
});
