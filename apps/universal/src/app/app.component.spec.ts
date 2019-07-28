import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';
import { configureTestSuite } from 'ng-bullet';

import { AppComponent } from './app.component';
import { CoreTestingModule } from './framework/core/testing';
import { NgrxTestingModule } from './framework/ngrx/testing';
import { languageActions } from './store';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, CoreTestingModule, NgrxTestingModule],
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

  test(
    'should dispatch `i18nInitLanguage` action',
    inject([ConfigService], (config: ConfigService) => {
      const fixture = TestBed.createComponent(AppComponent);
      const store$ = fixture.debugElement.injector.get(Store);
      const spy = spyOn(store$, 'dispatch');
      fixture.detectChanges();

      const settings = config.getSettings('i18n');
      const action = languageActions.i18nInitLanguage(settings);

      expect(spy).toHaveBeenCalledWith(action);
      expect(spy).toHaveBeenCalledTimes(1);
    })
  );
});
