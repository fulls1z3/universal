import { Component } from '@angular/core';

import { BaseComponent } from '../framework/core';
import { routeAnimation } from '../shared';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['about.component.scss'],
  animations: [routeAnimation]
})
export class AboutComponent extends BaseComponent {}
