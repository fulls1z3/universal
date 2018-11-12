// angular
import { Component } from '@angular/core';

// app
import { BaseComponent } from '~/app/framework/core';
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './about-us.component.html',
  styleUrls: ['about-us.component.scss'],
  animations: [routeAnimation]
})
export class AboutUsComponent extends BaseComponent {
}
