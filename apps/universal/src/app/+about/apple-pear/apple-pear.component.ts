import { Component } from '@angular/core';
import { BaseComponent, routeAnimation } from '@fulls1z3/shared/ui-base';

@Component({
  templateUrl: './apple-pear.component.html',
  styleUrls: ['apple-pear.component.scss'],
  animations: [routeAnimation]
})
export class ApplePearComponent extends BaseComponent {}
