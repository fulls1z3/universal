// angular
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

// libs
import { StoreModule } from '@ngrx/store';

// framework
import { t } from '../../framework/testing';
import { CoreTestingModule } from '../../framework/core/testing/core-testing.module';
import { RouterTestingModule } from '../../framework/router/testing/router-testing.module';
import { I18NTestingModule } from '../../framework/i18n/testing/i18n-testing.module';

// routes & components
import { MainComponent } from './main.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      StoreModule.forRoot({}),
      CoreTestingModule,
      I18NTestingModule
    ],
    declarations: [
      MainComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('components', () => {
    t.describe('layout: MainComponent', () => {
      t.be(testModuleConfig);

      t.it('should build without a problem', t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(MainComponent);
            const instance = fixture.debugElement.componentInstance;
            t.e(instance).toBeTruthy();
          });
      }));
    });
  });
});
