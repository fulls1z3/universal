import { Component } from '@angular/core';

import { BaseComponent } from '../framework/core';
import { routeAnimation } from '../shared';

@Component({
  templateUrl: './secure.component.html',
  styleUrls: ['secure.component.scss'],
  animations: [routeAnimation]
})
export class SecureComponent extends BaseComponent {}
