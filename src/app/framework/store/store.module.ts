import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { I18NStoreModule } from './i18n';

@NgModule({
  imports: [CommonModule, I18NStoreModule]
})
export class StoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: StoreModule) {
    if (parentModule) {
      throw new Error('StoreFrameworkModule already loaded. Import in root module only.');
    }
  }
}
