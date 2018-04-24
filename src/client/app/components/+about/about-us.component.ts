// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '../../framework/core/src/base.component';

// app
import { routeAnimation } from '../../app.animations';

@Component({
  templateUrl: './about-us.component.html',
  styleUrls: ['about-us.component.scss'],
  animations: [routeAnimation]
})
export class AboutUsComponent extends BaseComponent {
}
