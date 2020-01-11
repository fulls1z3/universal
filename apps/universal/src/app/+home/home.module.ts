import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@fulls1z3/shared/ui-material';

import { SharedModule } from '../shared';

import { HomeComponent } from './home.component';
import { routes } from './home.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, SharedModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
