// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '../../framework/core/core.module';

// app
import { routeAnimation } from '../../app.animations';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['about.component.scss'],
  animations: [routeAnimation]
})
export class AboutComponent extends BaseComponent {
}
