import { NgModule } from '@angular/core';
import { FlexLayoutModule, LAYOUT_CONFIG } from '@angular/flex-layout';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { APP_LAYOUT_CONFIG } from '@fulls1z3/shared/util-core';
import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '../common/common.module';

import { CardComponent } from './card.component';

@NgModule({
  imports: [FlexLayoutModule, TranslateModule, MaterialModule, CommonModule],
  exports: [CardComponent],
  declarations: [CardComponent],
  providers: [
    {
      provide: LAYOUT_CONFIG,
      useValue: APP_LAYOUT_CONFIG
    }
  ]
})
export class CardModule {}
