// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule, LAYOUT_CONFIG } from '@angular/flex-layout';

// libs
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// framework
import { APP_LAYOUT_CONFIG } from '~/app/framework/core';
import { MaterialModule } from '~/app/framework/material';

// module
import { CommonModule } from '../common/common.module';
import { DataTableComponent } from './data-table.component';
import { DataTableBaseComponent } from './data-table-base.component';

@NgModule({
  imports: [
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    PerfectScrollbarModule,
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
