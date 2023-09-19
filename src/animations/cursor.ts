import { gsap } from 'gsap';

import { isMobile, matchDesktop } from '$utils';

export class Cursor {
  /**
   * Initialize the cursor enlarge on hover animation.
   * All of the following elements will play the animation on hover: `a`, `button`, `input`, `textarea` and elements with the `cursor-target` attribute defined.
   *
   * This animation is not loaded on mobile devices.
   */
  constructor() {
    if (matchDesktop.matches && !isMobile()) {
      const cursor = document.querySelector('.cursor');
      document
        .querySelectorAll('a, button, input, textarea, [cursor-target]')
        .forEach((element) => {
          element.addEventListener('mouseenter', () => {
            gsap.to(cursor, { fontSize: '2rem', opacity: 0.8, ease: 'back.out(2)' });
          });

          element.addEventListener('mouseleave', () => {
            gsap.to(cursor, { fontSize: '1rem', opacity: 1, ease: 'back.out(2)' });
          });
        });
    }
  }
}
