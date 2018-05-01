// angular
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

// libs
import { StoreModule } from '@ngrx/store';

// testing
import { t } from '~/app/framework/testing';
import { CoreTestingModule } from '~/app/framework/core/testing/core-testing.module';
import { RouterTestingModule } from '~/app/framework/router/testing/router-testing.module';

// module
import { ChangeLanguageComponent } from './change-language.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({}),
      CoreTestingModule,
      RouterTestingModule
    ],
    declarations: [ChangeLanguageComponent]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('i18n: ChangeLanguageComponent', () => {
      t.be(testModuleConfig);

      t.it('should build without a problem w/`languageCode` param', t.fakeAsync(() => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(ChangeLanguageComponent);
            const route = fixture.debugElement.injector.get(ActivatedRoute) as any;
            route.testParams = {languageCode: 'en'};

            fixture.detectChanges();
            t.tick();

            t.e(fixture.nativeElement)
              .toBeTruthy();
          });
      }));

      t.it('should build without a problem w/o `languageCode` param', t.fakeAsync(() => {
        TestBed.compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(ChangeLanguageComponent);
            const route = fixture.debugElement.injector.get(ActivatedRoute) as any;
            route.testParams = {languageCode: ''};

            fixture.detectChanges();
            t.tick();

            t.e(fixture.nativeElement)
              .toBeTruthy();
          });
      }));
    });
  });
});
