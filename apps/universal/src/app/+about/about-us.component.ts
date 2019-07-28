import { Component } from '@angular/core';

import { BaseComponent } from '../framework/core';
import { routeAnimation } from '../shared';

@Component({
  templateUrl: './about-us.component.html',
  styleUrls: ['about-us.component.scss'],
  animations: [routeAnimation]
})
export class AboutUsComponent extends BaseComponent {}
