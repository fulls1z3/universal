// angular
import { ChangeDetectionStrategy, Component } from '@angular/core';

// app
import { BaseComponent } from '~/app/framework/core';
import { routeAnimation } from '~/app/app.animations';

@Component({
  templateUrl: './about-banana.component.html',
  styleUrls: ['about-banana.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimation]
})
export class AboutBananaComponent extends BaseComponent {
}
