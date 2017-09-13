// angular
import { Component } from '@angular/core';

// app
import { routeAnimation } from '../../app.animations';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['about.component.scss'],
  animations: [routeAnimation]
})
export class AboutComponent {
}
