import { NgModule } from '@angular/core';
import { FlexLayoutModule, LAYOUT_CONFIG } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { APP_LAYOUT_CONFIG } from '~/app/framework/core';
import { MaterialModule } from '~/app/framework/material';
import { CommonModule } from '~/app/shared';

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
