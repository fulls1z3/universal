import { Component } from '@angular/core';

import { BaseComponent } from '../framework/core';
import { routeAnimation } from '../shared';

@Component({
  templateUrl: './about-apple-pear.component.html',
  styleUrls: ['about-apple-pear.component.scss'],
  animations: [routeAnimation]
})
export class AboutApplePearComponent extends BaseComponent {}
