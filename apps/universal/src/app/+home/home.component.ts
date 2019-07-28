import { Component } from '@angular/core';

import { BaseComponent } from '../framework/core';
import { routeAnimation } from '../shared';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [routeAnimation]
})
export class HomeComponent extends BaseComponent {}
