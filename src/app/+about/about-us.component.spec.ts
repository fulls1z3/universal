// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { configureTestSuite } from 'ng-bullet';

// framework
import { SharedModule } from '~/app/framework/core';
import { MaterialModule } from '~/app/framework/material';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { t } from '~/app/framework/testing';

// module
import { AboutUsComponent } from './about-us.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      SharedModule,
      MaterialModule,
      CoreTestingModule,
      I18NTestingModule
    ],
    declarations: [AboutUsComponent]
  });
});

t.describe('ng-seed/universal', () => {
  t.describe('+about: AboutUsComponent', () => {
    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(AboutUsComponent);
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      t.e(instance)
        .toBeTruthy();
    });
  });
});
