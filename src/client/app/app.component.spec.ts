// angular
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// libs
import { StoreModule } from '@ngrx/store';

// testing
import { t } from './framework/testing';
import { CoreTestingModule } from './framework/core/testing/core-testing.module';

// routes & components
import { AppComponent } from './app.component';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      StoreModule.forRoot({}),
      CoreTestingModule
    ],
    declarations: [AppComponent]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('AppComponent', () => {
    t.be(testModuleConfig);

    t.it('should build without a problem', t.async(() => {
      TestBed.compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(AppComponent);
          const instance = fixture.debugElement.componentInstance;
          fixture.detectChanges();
          t.e(instance)
            .toBeTruthy();
        });
    }));
  });
});
