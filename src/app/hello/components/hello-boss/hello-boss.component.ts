import { Component, OnInit } from '@angular/core';

// app
import { routeAnimation } from '~/app/app.animations';

@Component({
  selector: 'hello-boss',
  templateUrl: './hello-boss.component.html',
  styleUrls: ['./hello-boss.component.css'],
  animations: [routeAnimation]
})
export class HelloBossComponent implements OnInit {

  // tslint:disable-next-line:no-empty
  constructor() {
  }

  // tslint:disable-next-line:typedef
  // tslint:disable-next-line:no-empty
  ngOnInit() {
  }

}
