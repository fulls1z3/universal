import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseComponent } from '~/app/framework/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingOverlayComponent extends BaseComponent {
  @Input() isProcessing: boolean;
}
