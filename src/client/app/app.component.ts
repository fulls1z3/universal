// angular
import { Component, OnInit } from '@angular/core';

// external styles
import '../assets/sass/layout.scss';

@Component({
  selector: 'main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  ngOnInit(): void {
    this.title = '@nglibs/universal-example-app works!';
  }
}
