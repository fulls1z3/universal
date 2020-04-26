import { RenderFlag } from '../shared';

import { AirlineDetailComponent } from './airline/airline-detail/airline-detail.component';
import { AirlineComponent } from './airline/airline.component';

export const routes = [
  {
    path: '',
    children: [
      {
        path: 'airlines',
        children: [
          {
            path: '',
            component: AirlineComponent,
            data: {
              meta: {
                title: 'AIR_UNIVERSAL.AIRLINE.PAGE_TITLE',
                description: 'AIR_UNIVERSAL.META_DESCRIPTION'
              }
            }
          },
          {
            path: 'create',
            component: AirlineDetailComponent,
            data: {
              renderFlag: RenderFlag.Create,
              meta: {
                title: 'AIR_UNIVERSAL.AIRLINE.AIRLINE_DETAIL.PAGE_TITLE',
                description: 'AIR_UNIVERSAL.META_DESCRIPTION'
              }
            }
          },
          {
            path: ':id',
            component: AirlineDetailComponent,
            data: {
              renderFlag: RenderFlag.Update,
              meta: {
                title: 'AIR_UNIVERSAL.AIRLINE.AIRLINE_DETAIL.PAGE_TITLE',
                description: 'AIR_UNIVERSAL.META_DESCRIPTION'
              }
            }
          }
        ]
      }
    ]
  }
];
