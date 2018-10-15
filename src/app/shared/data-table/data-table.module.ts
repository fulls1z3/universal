// angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule, LAYOUT_CONFIG } from '@angular/flex-layout';

// libs
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// framework
import { APP_LAYOUT_CONFIG } from '~/app/framework/core/shared.module';
import { MaterialModule } from '~/app/framework/material/material.module';

// module
import { CommonModule } from '../common/common.module';
import { DataTableComponent } from './data-table.component';

export { DataTableComponent };
export { buttonFactory, DataTableButton } from './models/data-table-button';
export { columnFactory, DataTableColumn, localizedColumnFactory } from './models/data-table-column';
export { DataTableLinkButton, linkButtonFactory } from './models/data-table-link-button';
export { DataTableOptions, optionsFactory } from './models/data-table-options';

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
  declarations: [DataTableComponent],
  providers: [
    {
      provide: LAYOUT_CONFIG,
      useValue: APP_LAYOUT_CONFIG
    }
  ]
})
export class DataTableModule {
}
