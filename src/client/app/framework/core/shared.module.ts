// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// libs
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    TranslateModule
  ]
})
export class SharedModule {
}
