import { Component } from '@angular/core';
import { BaseComponent, routeAnimation } from '@fulls1z3/shared/ui-base';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['about.component.scss'],
  animations: [routeAnimation]
})
export class AboutComponent extends BaseComponent {}
