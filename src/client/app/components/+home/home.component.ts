// angular
import { Component } from '@angular/core';

// app
import { routeAnimation } from '../../app.animations';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [routeAnimation]
})
export class HomeComponent {
}
