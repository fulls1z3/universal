import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreFrameworkModule } from '~/app/framework/store';
import { environment } from '~/environments/environment';

import { AirUniversalStoreModule } from './air-universal';

@NgModule({
  imports: [
    CommonModule,
    NgrxStoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production && environment.hasStoreDevTools ? StoreDevtoolsModule.instrument() : [],
    StoreFrameworkModule.forRoot(),
    AirUniversalStoreModule
  ]
})
export class StoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: StoreModule) {
    if (parentModule) {
      throw new Error('StoreModule already loaded. Import in root module only.');
    }
  }
}
