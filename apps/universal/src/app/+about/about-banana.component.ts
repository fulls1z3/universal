import { Component } from '@angular/core';

import { BaseComponent } from '../framework/core';
import { routeAnimation } from '../shared';

@Component({
  templateUrl: './about-banana.component.html',
  styleUrls: ['about-banana.component.scss'],
  animations: [routeAnimation]
})
export class AboutBananaComponent extends BaseComponent {}
