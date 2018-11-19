// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// app
import { MaterialModule } from '~/app/framework/material';
import { CardModule } from '~/app/shared/card/card.module';
import { DataTableModule } from '~/app/shared/data-table';
import { SharedModule } from '~/app/shared';

// module
import { AirlineDetailContainerComponent } from './airline/airline-detail/airline-detail-container.component';
import { AirlineDetailComponent } from './airline/airline-detail/airline-detail.component';
import { AirlineComponent } from './airline/airline.component';
import { routes } from './air-universal.routes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    CardModule,
    DataTableModule,
    SharedModule
  ],
  declarations: [
    AirlineDetailContainerComponent,
    AirlineDetailComponent,
    AirlineComponent
  ]
})
export class AirUniversalModule {
}
