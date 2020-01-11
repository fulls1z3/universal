import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthEffects } from './auth/auth.effects';
import * as fromAuth from './auth/auth.reducer';
import { AUTH } from './auth/auth.state';

@NgModule({
  imports: [StoreModule.forFeature(AUTH, fromAuth.reducer), EffectsModule.forFeature([AuthEffects])]
})
export class AccountStoreModule {}
