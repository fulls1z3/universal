import { Component } from '@angular/core';
import { BaseComponent, routeAnimation } from '@fulls1z3/shared/ui-base';

@Component({
  templateUrl: './about-banana.component.html',
  styleUrls: ['about-banana.component.scss'],
  animations: [routeAnimation]
})
export class AboutBananaComponent extends BaseComponent {}
