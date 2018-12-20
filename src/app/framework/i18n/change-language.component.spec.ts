import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { RouterTestingModule } from '~/app/framework/router/testing';
import { languageActions } from '~/app/framework/store';
import { t } from '~/app/framework/testing';

import { ChangeLanguageComponent } from './change-language.component';

const MOCK_EMPTY_PARAMS = { languageCode: '' };
const MOCK_PARAMS = { languageCode: 'en' };

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [CoreTestingModule, NgrxTestingModule, RouterTestingModule],
    declarations: [ChangeLanguageComponent]
  });
});

t.describe('ChangeLanguageComponent', () => {
  t.it('should build without a problem', () => {
    const fixture = TestBed.createComponent(ChangeLanguageComponent);
    const instance = fixture.componentInstance;
    const route = fixture.debugElement.injector.get<any>(ActivatedRoute);
    route.testParams = MOCK_PARAMS;
    fixture.detectChanges();

    t.e(instance).toBeTruthy();
  });

  t.it('should dispatch `use` action w/`languageCode` param', () => {
    const fixture = TestBed.createComponent(ChangeLanguageComponent);
    const route = fixture.debugElement.injector.get<any>(ActivatedRoute);
    route.testParams = MOCK_PARAMS;
    const store$ = fixture.debugElement.injector.get(Store);
    const spy = t.spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const action = languageActions.i18nUseLanguage(MOCK_PARAMS.languageCode);

    t.e(spy).toHaveBeenCalledWith(action);
    t.e(spy).toHaveBeenCalledTimes(1);
  });

  t.it('should not dispatch `use` action w/o `languageCode` param', () => {
    const fixture = TestBed.createComponent(ChangeLanguageComponent);
    const route = fixture.debugElement.injector.get<any>(ActivatedRoute);
    route.testParams = MOCK_EMPTY_PARAMS;
    const store$ = fixture.debugElement.injector.get(Store);
    const spy = t.spyOn(store$, 'dispatch');
    fixture.detectChanges();

    t.e(spy).toHaveBeenCalledTimes(0);
  });
});
