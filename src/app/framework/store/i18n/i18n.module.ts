// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// module
import { LanguageEffects } from './language/language.effects';
import * as fromLanguage from './language/language.reducer';
import { LANGUAGE } from './language/language.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(LANGUAGE, fromLanguage.reducer),
    EffectsModule.forFeature([LanguageEffects])
  ]
})
export class I18NModule { }
