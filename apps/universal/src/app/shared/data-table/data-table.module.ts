import { NgModule } from '@angular/core';
import { FlexLayoutModule, LAYOUT_CONFIG } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { APP_LAYOUT_CONFIG } from '@fulls1z3/shared/util-core';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { CommonModule } from '../common/common.module';

import { DataTableBaseComponent } from './data-table-base.component';
import { DataTableComponent } from './data-table.component';

@NgModule({
  imports: [RouterModule, FlexLayoutModule, TranslateModule, PerfectScrollbarModule, MaterialModule, CommonModule],
  exports: [DataTableComponent],
  declarations: [DataTableComponent, DataTableBaseComponent],
  providers: [
    {
      provide: LAYOUT_CONFIG,
      useValue: APP_LAYOUT_CONFIG
    }
  ]
})
export class DataTableModule {}
