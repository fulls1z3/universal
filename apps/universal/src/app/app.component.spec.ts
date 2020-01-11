import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { languageActions } from '@fulls1z3/shared/store-i18n';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';
import { configureTestSuite } from 'ng-bullet';

import { AppComponent } from './app.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, CoreTestingModule, StoreTestingModule],
    declarations: [AppComponent]
  });
});

describe('AppComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });

  test('should dispatch `i18nInitLanguage` action', inject([ConfigService], (config: ConfigService) => {
    const fixture = TestBed.createComponent(AppComponent);
    const store$ = fixture.debugElement.injector.get(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const settings = config.getSettings('i18n');
    const action = languageActions.i18nInitLanguage(settings);

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(1);
  }));
});
