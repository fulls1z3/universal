import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { SharedModule as _SharedModule } from '@fulls1z3/shared/util-core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [CommonModule, MaterialModule, _SharedModule, TranslateModule]
})
export class SharedModule {}
