// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '../../framework/core/core.module';

// app
import { routeAnimation } from '../../app.animations';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [routeAnimation]
})
export class HomeComponent extends BaseComponent {
}
