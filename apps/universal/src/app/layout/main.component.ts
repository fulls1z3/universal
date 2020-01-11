import { Component } from '@angular/core';
import { BaseComponent } from '@fulls1z3/shared/ui-base';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent extends BaseComponent {
  onActivate(event$: any, scrollContainer: any): void {
    scrollContainer.scrollTop = 0;
  }
}
