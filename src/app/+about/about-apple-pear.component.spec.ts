// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { configureTestSuite } from 'ng-bullet';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { t } from '~/app/framework/testing';

// app
import { SharedModule } from '~/app/framework/core';
import { MaterialModule } from '~/app/framework/material';

// module
import { AboutApplePearComponent } from './about-apple-pear.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      CoreTestingModule,
      I18NTestingModule,
      SharedModule,
      MaterialModule
    ],
    declarations: [AboutApplePearComponent]
  });
});

t.describe('ng-seed/universal', () => {
  t.describe('+about: AboutApplePearComponent', () => {
    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(AboutApplePearComponent);
      const instance = fixture.componentInstance;
      fixture.detectChanges();

      t.e(instance)
        .toBeTruthy();
    });
  });
});
