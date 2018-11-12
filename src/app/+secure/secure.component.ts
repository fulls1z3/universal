// angular
import { Component } from '@angular/core';

// app
import { BaseComponent } from '~/app/framework/core';
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './secure.component.html',
  styleUrls: ['secure.component.scss'],
  animations: [routeAnimation]
})
export class SecureComponent extends BaseComponent {
}
