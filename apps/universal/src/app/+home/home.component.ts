import { Component } from '@angular/core';
import { BaseComponent, routeAnimation } from '@fulls1z3/shared/ui-base';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [routeAnimation]
})
export class HomeComponent extends BaseComponent {}
