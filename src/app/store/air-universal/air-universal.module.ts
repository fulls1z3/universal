// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// module
import { AirlineEffects } from './airline/airline.effects';
import * as fromAirline from './airline/airline.reducer';
import { AIRLINE } from './airline/airline.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(AIRLINE, fromAirline.reducer),
    EffectsModule.forFeature([AirlineEffects])
  ]
})
export class AirUniversalModule { }
