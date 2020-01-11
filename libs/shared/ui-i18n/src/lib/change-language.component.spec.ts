import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { languageActions } from '@fulls1z3/shared/store-i18n';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { StoreTestingModule } from '@fulls1z3/shared/util-store/testing';
import { RouterTestingModule } from '@fulls1z3/shared/util-testing';
import { Store } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';

import { ChangeLanguageComponent } from './change-language.component';

const MOCK_EMPTY_PARAMS = { languageCode: '' };
const MOCK_PARAMS = { languageCode: 'en' };

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [CoreTestingModule, StoreTestingModule, RouterTestingModule],
    declarations: [ChangeLanguageComponent]
  });
});

describe('ChangeLanguageComponent', () => {
  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(ChangeLanguageComponent);
    const instance = fixture.componentInstance;
    const route = fixture.debugElement.injector.get<any>(ActivatedRoute);
    route.testParams = MOCK_PARAMS;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });

  test('should dispatch `use` action w/`languageCode` param', () => {
    const fixture = TestBed.createComponent(ChangeLanguageComponent);
    const route = fixture.debugElement.injector.get<any>(ActivatedRoute);
    route.testParams = MOCK_PARAMS;
    const store$ = fixture.debugElement.injector.get(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    const action = languageActions.i18nUseLanguage(MOCK_PARAMS.languageCode);

    expect(spy).toHaveBeenCalledWith(action);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should not dispatch `use` action w/o `languageCode` param', () => {
    const fixture = TestBed.createComponent(ChangeLanguageComponent);
    const route = fixture.debugElement.injector.get<any>(ActivatedRoute);
    route.testParams = MOCK_EMPTY_PARAMS;
    const store$ = fixture.debugElement.injector.get(Store);
    const spy = spyOn(store$, 'dispatch');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
