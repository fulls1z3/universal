// angular
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// testing
import { t } from '../../framework/testing';

// routes & components
import { AboutUsComponent } from './about-us.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ],
    declarations: [AboutUsComponent]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('components', () => {
    t.describe('+about: AboutUsComponent', () => {
      t.be(testModuleConfig);

      t.it('should build without a problem', async(() => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(AboutUsComponent);
            const instance = fixture.debugElement.componentInstance;
            t.e(instance).toBeTruthy();
          });
      }));
    });
  });
});
