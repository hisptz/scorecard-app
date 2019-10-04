import {animate, group,state, style, transition, trigger} from '@angular/animations';

export const visibilityChanged = trigger('visibilityChanged', [
  state('notHovered' , style({
    'transform': 'scale(1, 1)',
    '-webkit-box-shadow': '0 0 0px rgba(0,0,0,0.1)',
    'box-shadow': '0 0 0px rgba(0,0,0,0.2)',
    'background-color': 'rgba(0,0,0,0.0)',
    'border': '0px solid #ddd'
  })),
  state('hoovered', style({
    'transform': 'scale(1.02, 1.02)',
    '-webkit-box-shadow': '0 0 10px rgba(0,0,0,0.2)',
    'box-shadow': '0 0 10px rgba(0,0,0,0.1)',
    'background-color': 'rgba(0,0,0,0.02)',
    'border': '1px solid #ddd'
  })),
  transition('notHovered <=> hoovered', animate('300ms'))
]);

export const fadeSmooth = trigger('fadeSmooth', [
    state('void', style({opacity: 0.3})),
    transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        group([
          animate('300ms', style({transform: 'translateX(0)'})),
          animate('500ms', style({opacity: 1}))
        ])
      ]
    )
  ]);

