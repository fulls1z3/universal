import { HomeComponent } from './home.component';

export const routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      meta: {
        title: 'PUBLIC.HOME.PAGE_TITLE',
        override: true,
        description: 'PUBLIC.HOME.META_DESCRIPTION'
      }
    }
  }
];
