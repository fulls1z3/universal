// angular
import { Routes } from '@angular/router';

// components
import { AboutComponent } from './about.component';
import { AboutUsComponent } from './about-us.component';
import { AboutBananaComponent } from './about-banana.component';
import { AboutApplePearComponent } from './about-apple-pear.component';

export const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      meta: {
        title: 'PUBLIC.ABOUT.PAGE_TITLE',
        description: 'PUBLIC.ABOUT.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'us/:topicId',
    component: AboutUsComponent,
    data: {
      meta: {
        title: 'PUBLIC.ABOUT_US.PAGE_TITLE',
        description: 'PUBLIC.ABOUT_US.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'banana',
    component: AboutBananaComponent,
    data: {
      meta: {
        title: 'PUBLIC.ABOUT_BANANA.PAGE_TITLE',
        description: 'PUBLIC.ABOUT_BANANA.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'apple/:fruitId/pear',
    component: AboutApplePearComponent,
    data: {
      meta: {
        title: 'PUBLIC.ABOUT_APPLE_PEAR.PAGE_TITLE',
        description: 'PUBLIC.ABOUT_APPLE_PEAR.META_DESCRIPTION'
      }
    }
  }
];
