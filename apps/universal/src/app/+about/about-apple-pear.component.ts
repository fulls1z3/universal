import { Component } from '@angular/core';
import { BaseComponent, routeAnimation } from '@fulls1z3/shared/ui-base';

@Component({
  templateUrl: './about-apple-pear.component.html',
  styleUrls: ['about-apple-pear.component.scss'],
  animations: [routeAnimation]
})
export class AboutApplePearComponent extends BaseComponent {}
