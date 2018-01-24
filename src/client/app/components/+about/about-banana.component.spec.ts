// angular
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// framework
import { SharedModule } from '../../framework/core/shared.module';
import { MaterialModule } from '../../framework/material/material.module';

// testing
import { t } from '../../framework/testing';
import { I18NTestingModule } from '../../framework/i18n/testing/i18n-testing.module';

// routes & components
import { AboutBananaComponent } from './about-banana.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MaterialModule,
      SharedModule,
      I18NTestingModule
    ],
    declarations: [AboutBananaComponent]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('components', () => {
    t.describe('+about: AboutBananaComponent', () => {
      t.be(testModuleConfig);

      t.it('should build without a problem', async(() => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(AboutBananaComponent);
            const instance = fixture.debugElement.componentInstance;
            t.e(instance)
              .toBeTruthy();
          });
      }));
    });
  });
});
