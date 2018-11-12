// angular
import { Component } from '@angular/core';

// app
import { BaseComponent } from '~/app/framework/core';
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['about.component.scss'],
  animations: [routeAnimation]
})
export class AboutComponent extends BaseComponent {
}
