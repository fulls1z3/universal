// angular
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { NgrxTestingModule } from '~/app/framework/ngrx/testing';
import { t } from '~/app/framework/testing';

// module
import { AirlineEffects } from './airline.effects';

const testModuleConfig = () => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoreTestingModule,
        NgrxTestingModule
      ],
      providers: [AirlineEffects]
    });
};

t.describe('ng-seed/universal', () => {
  t.describe('store', () => {
    t.describe('air-universal: AirlineEffects', () => {
      t.be(testModuleConfig);

      t.it('should build without a problem',
        t.inject([AirlineEffects], (effects: AirlineEffects) => {
          t.e(effects)
            .toBeTruthy();
        }));
    });
  });
});
