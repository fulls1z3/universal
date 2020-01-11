import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { configureTestSuite } from 'ng-bullet';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { MainComponent } from './main.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, PerfectScrollbarModule, CoreTestingModule, I18NTestingModule, StoreTestingModule],
    declarations: [MainComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });
});

describe('MainComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });

  test('should invoke `onActivate`', inject([ElementRef], (scrollContainer: ElementRef) => {
    const fixture = TestBed.createComponent(MainComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    instance.onActivate(undefined, scrollContainer);

    expect(instance).toBeTruthy();
  }));
});
