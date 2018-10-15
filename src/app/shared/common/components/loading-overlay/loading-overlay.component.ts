// angular
import { Component, Input } from '@angular/core';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent extends BaseComponent {
  @Input() isProcessing: boolean;
}
