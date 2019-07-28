import { NgModule } from '@angular/core';
import { FlexLayoutModule, LAYOUT_CONFIG } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { APP_LAYOUT_CONFIG } from '../../framework/core';
import { MaterialModule } from '../../framework/material';
import { CommonModule } from '../index';

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
