// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '../../framework/core/src/base.component';

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
