import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from 'ng-bullet';

import { SharedModule } from '../framework/core';
import { CoreTestingModule } from '../framework/core/testing';
import { I18NTestingModule } from '../framework/i18n/testing';
import { MaterialModule } from '../framework/material';

import { AboutBananaComponent } from './about-banana.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, CoreTestingModule, I18NTestingModule, SharedModule, MaterialModule],
    declarations: [AboutBananaComponent]
  });
});

describe('AboutBananaComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AboutBananaComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });
});
