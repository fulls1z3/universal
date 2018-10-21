// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '~/app/framework/core';

// app
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['about.component.scss'],
  animations: [routeAnimation]
})
export class AboutComponent extends BaseComponent {
}
