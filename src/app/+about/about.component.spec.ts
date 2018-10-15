// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// framework
import { SharedModule } from '~/app/framework/core/shared.module';
import { MaterialModule } from '~/app/framework/material/material.module';

// testing
import { I18NTestingModule } from '~/app/framework/i18n/testing/i18n-testing.module';
import { t } from '~/app/framework/testing';

// module
import { AboutComponent } from './about.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      SharedModule,
      MaterialModule,
      I18NTestingModule
    ],
    declarations: [AboutComponent]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('+about: AboutComponent', () => {
    t.be(testModuleConfig);

    t.it('should build without a problem', t.async(() => {
      TestBed.compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(AboutComponent);
          const instance = fixture.debugElement.componentInstance;
          t.e(instance)
            .toBeTruthy();
        });
    }));
  });
});
