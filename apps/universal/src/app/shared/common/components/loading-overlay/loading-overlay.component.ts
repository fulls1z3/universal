import { Component, Input } from '@angular/core';
import { BaseComponent } from '@fulls1z3/shared/ui-base';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent extends BaseComponent {
  @Input() readonly isProcessing: boolean;
}
