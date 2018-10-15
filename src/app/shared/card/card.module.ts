// angular
import { NgModule } from '@angular/core';
import { FlexLayoutModule, LAYOUT_CONFIG } from '@angular/flex-layout';

// libs
import { TranslateModule } from '@ngx-translate/core';

// framework
import { APP_LAYOUT_CONFIG } from '~/app/framework/core/shared.module';
import { MaterialModule } from '~/app/framework/material/material.module';

// module
import { CommonModule } from '../common/common.module';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    CommonModule
  ],
  exports: [CardComponent],
  declarations: [CardComponent],
  providers: [
    {
      provide: LAYOUT_CONFIG,
      useValue: APP_LAYOUT_CONFIG
    }
  ]
})
export class CardModule {
}
