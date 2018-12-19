import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AirlineEffects } from './airline/airline.effects';
import * as fromAirline from './airline/airline.reducer';
import { AIRLINE } from './airline/airline.state';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(AIRLINE, fromAirline.reducer), EffectsModule.forFeature([AirlineEffects])]
})
export class AirUniversalModule {}
