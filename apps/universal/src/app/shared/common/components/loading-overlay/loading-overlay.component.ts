import { Component, Input } from '@angular/core';

import { BaseComponent } from '../../../../framework/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent extends BaseComponent {
  @Input() readonly isProcessing: boolean;
}
