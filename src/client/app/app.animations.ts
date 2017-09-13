// angular
import { animate, state, style, transition, trigger } from '@angular/animations';

const DURATION = 400;

export const routeAnimation = trigger('routeAnimation', [
  state('void', style({
    position: 'fixed',
    width: '100%'
  })),
  state('*', style({
    display: 'block',
    position: 'absolute',
    top     : 0,
    bottom  : 0,
    left    : 0,
    right   : 0
  })),
  transition(':enter', [
    style({
      transform: 'translateY(100%)',
      opacity: 0
    }),
    animate(`${DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`, style({
      transform: 'translateY(0%)',
      opacity: 1
    }))
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0%)',
      opacity: 1
    }),
    animate(`${DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`, style({
      transform: 'translateY(-100%)',
      opacity: 0
    }))
  ])
]);
