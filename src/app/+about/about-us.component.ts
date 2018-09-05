// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

// app
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './about-us.component.html',
  styleUrls: ['about-us.component.scss'],
  animations: [routeAnimation]
})
export class AboutUsComponent extends BaseComponent {
}
