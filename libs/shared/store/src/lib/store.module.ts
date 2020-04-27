import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AccountStoreModule } from '@fulls1z3/shared/store-account';
import { AirUniversalStoreModule } from '@fulls1z3/shared/store-air-universal';
import { I18NStoreModule } from '@fulls1z3/shared/store-i18n';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';

@NgModule({
  imports: [AccountStoreModule, AirUniversalStoreModule, I18NStoreModule, EffectsModule.forRoot([]), NgrxStoreModule.forRoot({})]
})
export class StoreModule {
  static forRoot(): ModuleWithProviders<StoreModule> {
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
