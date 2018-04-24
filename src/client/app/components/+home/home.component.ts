// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '../../framework/core/src/base.component';

// app
import { routeAnimation } from '../../app.animations';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [routeAnimation]
})
export class HomeComponent extends BaseComponent {
}
