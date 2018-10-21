// angular
import { TestBed } from '@angular/core/testing';

// libs
import { configureTestSuite } from 'ng-bullet';

// testing
import { t } from '~/app/framework/testing';

// module
import { BaseComponent } from './base.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    declarations: [BaseComponent]
  });
});

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('core: BaseComponent', () => {
      t.it('should build without a problem', () => {
        const fixture = TestBed.createComponent(BaseComponent);
        const instance = fixture.componentInstance;

        fixture.detectChanges();

        t.e(instance)
          .toBeTruthy();
      });
    });
  });
});
