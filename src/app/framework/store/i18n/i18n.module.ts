import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LanguageEffects } from './language/language.effects';
import * as fromLanguage from './language/language.reducer';
import { LANGUAGE } from './language/language.state';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(LANGUAGE, fromLanguage.reducer), EffectsModule.forFeature([LanguageEffects])]
})
export class I18NModule {}
