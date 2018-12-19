import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '~/app/framework/material';
import { SharedModule } from '~/app/shared';
import { CardModule } from '~/app/shared/card/card.module';
import { DataTableModule } from '~/app/shared/data-table';

import { routes } from './air-universal.routes';
import { AirlineDetailContainerComponent } from './airline/airline-detail/airline-detail-container.component';
import { AirlineDetailComponent } from './airline/airline-detail/airline-detail.component';
import { AirlineComponent } from './airline/airline.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes), MaterialModule, CardModule, DataTableModule, SharedModule],
  declarations: [AirlineDetailContainerComponent, AirlineDetailComponent, AirlineComponent]
})
export class AirUniversalModule {}
