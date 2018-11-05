// angular
import { TestBed } from '@angular/core/testing';

// libs
import { configureTestSuite } from 'ng-bullet';

// testing
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { t } from '~/app/framework/testing';

// module
import { BaseContainerComponent } from './base-container.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [NgrxTestingModule],
    declarations: [BaseContainerComponent]
  });
});

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('core: BaseContainerComponent', () => {
      t.it('should build without a problem', () => {
        const fixture = TestBed.createComponent(BaseContainerComponent);
        const instance = fixture.componentInstance;

        fixture.detectChanges();

        t.e(instance)
          .toBeTruthy();
      });
    });
  });
});
