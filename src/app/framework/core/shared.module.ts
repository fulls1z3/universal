// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// libs
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    TranslateModule
  ]
})
export class SharedModule {
}
