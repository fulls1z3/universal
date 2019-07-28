import { RenderFlag } from '../shared';

import { AirlineDetailContainerComponent } from './airline/airline-detail/airline-detail-container.component';
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
            component: AirlineDetailContainerComponent,
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
            component: AirlineDetailContainerComponent,
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
