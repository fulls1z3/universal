// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// libs
import { Angulartics2, Angulartics2Module } from 'angulartics2';

// module
import { AnalyticsService } from './src/analytics.service';

export const ANALYTICS_PROVIDERS: Array<any> = [
  Angulartics2,
  AnalyticsService
];

export * from './src/analytics.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    Angulartics2Module.forRoot([])
  ],
  exports: [Angulartics2Module],
  providers: [
    ANALYTICS_PROVIDERS
  ]
})
export class AnalyticsModule {
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: AnalyticsModule,
      providers: configuredProviders
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AnalyticsModule) {
    if (parentModule)
      throw new Error('AnalyticsModule already loaded. Import in root module only.');
  }
}
