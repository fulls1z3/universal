// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule, LAYOUT_CONFIG } from '@angular/flex-layout';

// libs
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// app
import { APP_LAYOUT_CONFIG } from '~/app/framework/core';
import { MaterialModule } from '~/app/framework/material';
import { CommonModule } from '~/app/shared';

// module
import { DataTableComponent } from './data-table.component';
import { DataTableBaseComponent } from './data-table-base.component';

@NgModule({
  imports: [
    RouterModule,
    FlexLayoutModule,
    TranslateModule,
    PerfectScrollbarModule,
    MaterialModule,
    CommonModule
  ],
  exports: [DataTableComponent],
  declarations: [
    DataTableComponent,
    DataTableBaseComponent
  ],
  providers: [
    {
      provide: LAYOUT_CONFIG,
      useValue: APP_LAYOUT_CONFIG
    }
  ]
})
export class DataTableModule {
}
