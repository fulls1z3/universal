// angular
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

// libs
import { Store } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';

// framework
import { languageActions } from '~/app/framework/store';

// testing
import { t } from '~/app/framework/testing';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { RouterTestingModule } from '~/app/framework/router/testing';

// module
import { ChangeLanguageComponent } from './change-language.component';

const mockEmptyParams = {languageCode: ''};
const mockParams = {languageCode: 'en'};

configureTestSuite(() => {
  TestBed.configureTestingModule({
    imports: [
      CoreTestingModule,
      NgrxTestingModule,
      RouterTestingModule
    ],
    declarations: [ChangeLanguageComponent]
  });
});

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('i18n: ChangeLanguageComponent', () => {
      t.it('should build without a problem', () => {
        const fixture = TestBed.createComponent(ChangeLanguageComponent);
        const instance = fixture.componentInstance;
        const route = fixture.debugElement.injector.get<any>(ActivatedRoute);
        route.testParams = mockParams;

        fixture.detectChanges();

        t.e(instance)
          .toBeTruthy();
      });

      t.it('should dispatch `use` action w/`languageCode` param', () => {
        const fixture = TestBed.createComponent(ChangeLanguageComponent);
        const route = fixture.debugElement.injector.get<any>(ActivatedRoute);
        route.testParams = mockParams;
        const store$ = fixture.debugElement.injector.get(Store);
        const spy = t.spyOn(store$, 'dispatch');

        fixture.detectChanges();

        t.e(spy)
          .toHaveBeenCalledTimes(1);
        t.e(spy)
          .toHaveBeenCalledWith(languageActions.use(mockParams.languageCode));
      });

      t.it('should not dispatch `use` action w/o `languageCode` param', () => {
        const fixture = TestBed.createComponent(ChangeLanguageComponent);
        const route = fixture.debugElement.injector.get<any>(ActivatedRoute);
        route.testParams = mockEmptyParams;
        const store$ = fixture.debugElement.injector.get(Store);
        const spy = t.spyOn(store$, 'dispatch');

        fixture.detectChanges();

        t.e(spy)
          .toHaveBeenCalledTimes(0);
      });
    });
  });
});
