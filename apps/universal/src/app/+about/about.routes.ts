import { AboutComponent } from './about.component';
import { ApplePearComponent } from './apple-pear/apple-pear.component';
import { BananaComponent } from './banana/banana.component';
import { UsComponent } from './us/us.component';

export const routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      meta: {
        title: 'ABOUT.ABOUT.PAGE_TITLE',
        description: 'ABOUT.ABOUT.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'us/:topicId',
    component: UsComponent,
    data: {
      meta: {
        title: 'ABOUT.ABOUT_US.PAGE_TITLE',
        description: 'ABOUT.ABOUT_US.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'banana',
    component: BananaComponent,
    data: {
      meta: {
        title: 'ABOUT.ABOUT_BANANA.PAGE_TITLE',
        description: 'ABOUT.ABOUT_BANANA.META_DESCRIPTION'
      }
    }
  },
  {
    path: 'apple/:fruitId/pear',
    component: ApplePearComponent,
    data: {
      meta: {
        title: 'ABOUT.ABOUT_APPLE_PEAR.PAGE_TITLE',
        description: 'ABOUT.ABOUT_APPLE_PEAR.META_DESCRIPTION'
      }
    }
  }
];
