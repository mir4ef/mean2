import {
  animation,
  animate,
  style,
  useAnimation,
  transition,
  trigger,
  AnimationReferenceMetadata,
  AnimationMetadata
} from '@angular/animations';

// define the animation
const fadeAnimation: AnimationReferenceMetadata = animation([
  style({ opacity: '{{ start }}' }),
  animate('{{ time }}', style({ opacity: '{{ end }}' }))
]);

// export the animation as a function, so the params object can be controlled
export function fade(time = '.3s', start = 0, end = 1): AnimationMetadata {
  return trigger('fadeIn', [
    transition(':enter', [
      useAnimation(fadeAnimation, {
        params: {
          time,
          start,
          end
        }
      })
    ])
  ]);
}
