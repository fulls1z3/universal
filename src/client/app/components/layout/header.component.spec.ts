// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { StoreModule } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';

// testing
import { t } from '../../framework/testing';
import { CoreTestingModule } from '../../framework/core/testing/core-testing.module';
import { I18NTestingModule } from '../../framework/i18n/testing/i18n-testing.module';

// routes & components
import { HeaderComponent } from './header.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      StoreModule.forRoot({}),
      CoreTestingModule,
      I18NTestingModule
    ],
    declarations: [
      HeaderComponent,
      TranslatePipe
    ]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('components', () => {
    t.describe('layout: HeaderComponent', () => {
      t.be(testModuleConfig);

      t.it('should build without a problem', t.async(() => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(HeaderComponent);
            const instance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            t.e(instance).toBeTruthy();
          });
      }));
    });
  });
});
