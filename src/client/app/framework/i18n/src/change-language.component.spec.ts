// angular
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

// libs
import { StoreModule } from '@ngrx/store';

// framework
import { t } from '../../testing';
import { CoreTestingModule } from '../../core/testing/core-testing.module';
import { RouterTestingModule } from '../../router/testing/router-testing.module';

// module
import { ChangeLanguageComponent } from './change-language.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      CoreTestingModule,
      StoreModule.forRoot({})
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
