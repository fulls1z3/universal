import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule as SharedFrameworkModule } from '~/app/framework/core';

import { CommonModule } from './common/common.module';

@NgModule({
  exports: [TranslateModule, SharedFrameworkModule, CommonModule]
})
export class SharedModule {}
