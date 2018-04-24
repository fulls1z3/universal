// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

// app
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './about-apple-pear.component.html',
  styleUrls: ['about-apple-pear.component.scss'],
  animations: [routeAnimation]
})
export class AboutApplePearComponent extends BaseComponent {
}
