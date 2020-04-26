import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '@fulls1z3/shared/ui-base';

import { RenderFlag } from '../../../../shared';

@Component({
  selector: 'fs-airline-detail-header',
  templateUrl: './airline-detail-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AirlineDetailHeaderComponent extends BaseComponent {
  @Input() readonly isProcessing: boolean;
  @Input() readonly renderFlag: RenderFlag;
  @Input() readonly baseRoute: Array<string>
  @Input() readonly title: string;
  @Output() readonly deleteClick = new EventEmitter<void>();
  @Output() readonly saveClick = new EventEmitter<void>();
  readonly backIcon = 'arrow_back';
  readonly loading = '...';

  get isDeleteDisabled(): boolean {
    return this.renderFlag === RenderFlag.Create;
  }

  onDeleteClicked(): void {
    this.deleteClick.emit();
  }

  onSaveClicked(): void {
    this.saveClick.emit();
  }
}
