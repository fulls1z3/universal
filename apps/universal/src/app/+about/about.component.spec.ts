import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from 'ng-bullet';

import { SharedModule } from '../framework/core';
import { CoreTestingModule } from '../framework/core/testing';
import { I18NTestingModule } from '../framework/i18n/testing';
import { MaterialModule } from '../framework/material';

import { AboutComponent } from './about.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, CoreTestingModule, I18NTestingModule, SharedModule, MaterialModule],
    declarations: [AboutComponent]
  });
});

describe('AboutComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });
});
