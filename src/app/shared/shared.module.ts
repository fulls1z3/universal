// angular
import { NgModule } from '@angular/core';

// libs
import { TranslateModule } from '@ngx-translate/core';

// framework
import { SharedModule as SharedFrameworkModule } from '~/app/framework/core';

// module
import { CommonModule } from './common/common.module';

@NgModule({
  exports: [
    TranslateModule,
    SharedFrameworkModule,
    CommonModule
  ]
})
export class SharedModule {
}
