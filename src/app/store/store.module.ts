// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// libs
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// env
import { environment } from '~/environments/environment';

// framework
import { StoreFrameworkModule } from '~/app/framework/store';

// module
import { AirUniversalModule } from './air-universal';

@NgModule({
  imports: [
    CommonModule,
    NgrxStoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument()
      : [],
    StoreFrameworkModule.forRoot(),
    AirUniversalModule
  ]
})
export class StoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: StoreModule) {
    if (parentModule)
      throw new Error('StoreModule already loaded. Import in root module only.');
  }
}
