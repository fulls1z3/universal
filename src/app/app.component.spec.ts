import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { ConfigService } from '@ngx-config/core';
import { configureTestSuite } from 'ng-bullet';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { t } from '~/app/framework/testing';
import { languageActions } from '~/app/store';

import { AppComponent } from './app.component';

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule, CoreTestingModule, NgrxTestingModule],
    declarations: [AppComponent]
  });
});

t.describe('AppComponent', () => {
  t.it('should build without a problem', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    t.e(instance).toBeTruthy();
  });

  t.it(
    'should dispatch `i18nInitLanguage` action',
    t.inject([ConfigService], (config: ConfigService) => {
      const fixture = TestBed.createComponent(AppComponent);
      const store$ = fixture.debugElement.injector.get(Store);
      const spy = t.spyOn(store$, 'dispatch');
      fixture.detectChanges();

      const settings = config.getSettings('i18n');
      const action = languageActions.i18nInitLanguage(settings);

      t.e(spy).toHaveBeenCalledWith(action);
      t.e(spy).toHaveBeenCalledTimes(1);
    })
  );
});
