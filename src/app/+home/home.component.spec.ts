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
import { HomeComponent } from './home.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      SharedModule,
      MaterialModule,
      CoreTestingModule,
      I18NTestingModule
    ],
    declarations: [HomeComponent]
  });
});

t.describe('ng-seed/universal', () => {
  t.describe('+home: HomeComponent', () => {
    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(HomeComponent);
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      t.e(instance)
        .toBeTruthy();
    });
  });
});
