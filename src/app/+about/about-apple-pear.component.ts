// angular
import { ChangeDetectionStrategy, Component } from '@angular/core';

// app
import { BaseComponent } from '~/app/framework/core';
import { routeAnimation } from '~/app/shared';

@Component({
  templateUrl: './about-apple-pear.component.html',
  styleUrls: ['about-apple-pear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimation]
})
export class AboutApplePearComponent extends BaseComponent {
}
