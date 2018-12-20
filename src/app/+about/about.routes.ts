import { AboutApplePearComponent } from './about-apple-pear.component';
import { AboutBananaComponent } from './about-banana.component';
import { AboutUsComponent } from './about-us.component';
import { AboutComponent } from './about.component';

export const routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      meta: {
        title: 'PUBLIC.ABOUT.ABOUT.PAGE_TITLE',
        description: 'PUBLIC.ABOUT.ABOUT.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'us/:topicId',
    component: AboutUsComponent,
    data: {
      meta: {
        title: 'PUBLIC.ABOUT.ABOUT_US.PAGE_TITLE',
        description: 'PUBLIC.ABOUT.ABOUT_US.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'banana',
    component: AboutBananaComponent,
    data: {
      meta: {
        title: 'PUBLIC.ABOUT.ABOUT_BANANA.PAGE_TITLE',
        description: 'PUBLIC.ABOUT.ABOUT_BANANA.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'apple/:fruitId/pear',
    component: AboutApplePearComponent,
    data: {
      meta: {
        title: 'PUBLIC.ABOUT.ABOUT_APPLE_PEAR.PAGE_TITLE',
        description: 'PUBLIC.ABOUT.ABOUT_APPLE_PEAR.META_DESCRIPTION'
      }
    }
  }
];
