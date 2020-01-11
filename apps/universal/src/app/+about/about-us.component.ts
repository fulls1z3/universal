import { Component } from '@angular/core';
import { BaseComponent, routeAnimation } from '@fulls1z3/shared/ui-base';

@Component({
  templateUrl: './about-us.component.html',
  styleUrls: ['about-us.component.scss'],
  animations: [routeAnimation]
})
export class AboutUsComponent extends BaseComponent {}
