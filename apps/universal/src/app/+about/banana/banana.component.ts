import { Component } from '@angular/core';
import { BaseComponent, routeAnimation } from '@fulls1z3/shared/ui-base';

@Component({
  templateUrl: './banana.component.html',
  styleUrls: ['banana.component.scss'],
  animations: [routeAnimation]
})
export class BananaComponent extends BaseComponent {}
