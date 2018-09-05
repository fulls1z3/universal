// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

// app
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './secure.component.html',
  styleUrls: ['secure.component.scss'],
  animations: [routeAnimation]
})
export class SecureComponent extends BaseComponent {
}
