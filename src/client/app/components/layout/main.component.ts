// angular
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent {
  onActivate(event$: any, scrollContainer: any): void {
    scrollContainer.scrollTop = 0;
  }
}
