// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '~/app/framework/core';

// app
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [routeAnimation]
})
export class HomeComponent extends BaseComponent {
}
