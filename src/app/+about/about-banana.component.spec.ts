import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from 'ng-bullet';
import { SharedModule } from '~/app/framework/core';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { MaterialModule } from '~/app/framework/material';
import { t } from '~/app/framework/testing';

import { AboutBananaComponent } from './about-banana.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, CoreTestingModule, I18NTestingModule, SharedModule, MaterialModule],
    declarations: [AboutBananaComponent]
  });
});

t.describe('AboutBananaComponent', () => {
  t.it('should build without a problem', () => {
    const fixture = TestBed.createComponent(AboutBananaComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    t.e(instance).toBeTruthy();
  });
});
