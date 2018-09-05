// angular
import { Routes } from '@angular/router';

// components
import { HelloBossComponent } from './components/hello-boss/hello-boss.component';

export const routes: Routes = [
  {
    path: '',
    component: HelloBossComponent,
    data: {
      meta: {
        title: 'Hello title',
        override: true,
        description: 'Hello description'
      }
    }
  }
];
