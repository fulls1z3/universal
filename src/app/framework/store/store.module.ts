// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// module
import { I18NModule } from './i18n';

@NgModule({
  imports: [
    CommonModule,
    I18NModule
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
