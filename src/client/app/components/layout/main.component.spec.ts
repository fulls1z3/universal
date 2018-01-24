// angular
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { StoreModule } from '@ngrx/store';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// framework
import { t } from '../../framework/testing';
import { CoreTestingModule } from '../../framework/core/testing/core-testing.module';
import { I18NTestingModule } from '../../framework/i18n/testing/i18n-testing.module';

// routes & components
import { MainComponent } from './main.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      StoreModule.forRoot({}),
      PerfectScrollbarModule,
      CoreTestingModule,
      I18NTestingModule
    ],
    declarations: [MainComponent],
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
            fixture.detectChanges();
            t.e(instance)
              .toBeTruthy();
          });
      }));

      t.it('should invoke `onActivate`', t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(MainComponent);
            const instance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            t.e(instance)
              .toBeTruthy();

            const scrollContainer = TestBed.get(ElementRef);
            instance.onActivate(undefined, scrollContainer);
            t.e(instance)
              .toBeTruthy();
          });
      }));
    });
  });
});
