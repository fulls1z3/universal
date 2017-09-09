// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// libs
import { Angulartics2, Angulartics2Segment } from 'angulartics2';

// module
import { AnalyticsService } from './src/analytics.service';

export const ANALYTICS_PROVIDERS: Array<any> = [
  Angulartics2,
  Angulartics2Segment,
  AnalyticsService
];

export * from './src/analytics.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule
  ],
  providers: [ANALYTICS_PROVIDERS]
})
export class AnalyticsModule {
}
