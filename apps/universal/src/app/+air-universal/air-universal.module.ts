import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@fulls1z3/shared/ui-material';

import { SharedModule } from '../shared';
import { FalsyModule } from '../shared/falsy/falsy.module';

import { routes } from './air-universal.routes';
import { AirlineDetailFormComponent } from './airline/airline-detail/airline-detail-form/airline-detail-form.component';
import { AirlineDetailHeaderComponent } from './airline/airline-detail/airline-detail-header/airline-detail-header.component';
import { AirlineDetailComponent } from './airline/airline-detail/airline-detail.component';
import { AirlineHeaderComponent } from './airline/airline-header/airline-header.component';
import { AirlineTableComponent } from './airline/airline-table/airline-table.component';
import { AirlineComponent } from './airline/airline.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    FalsyModule
  ],
  declarations: [
    AirlineDetailFormComponent,
    AirlineDetailHeaderComponent,
    AirlineDetailComponent,
    AirlineHeaderComponent,
    AirlineTableComponent,
    AirlineComponent
  ]
})
export class AirUniversalModule {}
