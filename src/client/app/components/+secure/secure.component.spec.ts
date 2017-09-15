// angular
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MdCardModule } from '@angular/material';

// framework
import { SharedModule } from '../../framework/core/shared.module';

// testing
import { t } from '../../framework/testing';
import { I18NTestingModule } from '../../framework/i18n/testing/i18n-testing.module';

// routes & components
import { SecureComponent } from './secure.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MdCardModule,
      SharedModule,
      I18NTestingModule
    ],
    declarations: [SecureComponent]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('components', () => {
    t.describe('+secure: SecureComponent', () => {
      t.be(testModuleConfig);

      t.it('should build without a problem', async(() => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(SecureComponent);
            const instance = fixture.debugElement.componentInstance;
            t.e(instance).toBeTruthy();
          });
      }));
    });
  });
});
