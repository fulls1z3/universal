// angular
import { Routes } from '@angular/router';

// module
import { AboutComponent } from './about.component';
import { AboutUsComponent } from './about-us.component';
import { AboutBananaComponent } from './about-banana.component';
import { AboutApplePearComponent } from './about-apple-pear.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  },
  {
    path: 'us/:topicId',
    component: AboutUsComponent
  },
  {
    path: 'banana',
    component: AboutBananaComponent
  },
  {
    path: 'apple/:fruitId/pear',
    component: AboutApplePearComponent
  }
];
