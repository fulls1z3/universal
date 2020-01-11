import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, LAYOUT_CONFIG } from '@angular/flex-layout';

export const APP_LAYOUT_CONFIG = {
  addFlexToParent: true,
  addOrientationBps: false,
  disableDefaultBps: false,
  disableVendorPrefixes: false,
  serverLoaded: false,
  useColumnBasisZero: false
};

@NgModule({
  exports: [HttpClientModule, FlexLayoutModule],
  providers: [
    {
      provide: LAYOUT_CONFIG,
      useValue: APP_LAYOUT_CONFIG
    }
  ]
})
export class SharedModule {}
