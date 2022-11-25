import { simulateEvent } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

import {
  registerCharsSlideUp,
  registerWordsSlideUp,
  registerNavigation,
  registerBackgroundColor,
} from '../animations';
import { registerSplitText } from '../utils';

let delay = 0.2;

export const pageLoad = (beforeAnimationStart: CallableFunction) => {
  // Register core animations
  registerNavigation();
  registerSplitText().then(() => {
    registerCharsSlideUp();
    registerWordsSlideUp();
  });
  registerBackgroundColor();

  // Callback before done loading animation starts
  beforeAnimationStart();

  // Play the lottie animation
  const t = document.querySelector('.transition_background_lottie') as EventTarget;
  simulateEvent(t, 'click');

  return gsap
    .to('.transition', {
      y: '-101%',
      display: 'none',
      duration: 0.8,
      delay: delay,
      ease: 'expo',
    })
    .play();
};

export const pageNavigate = () => {
  const t = document.querySelector('.transition_background_lottie') as EventTarget;
  simulateEvent(t, 'click');

  return gsap
    .to('.transition', {
      y: '0%',
      display: 'block',
      duration: 0.8,
      ease: 'expo',
    })
    .play();
};

// On link click
$('a').on('click', function (e) {
  if (
    $(this).prop('hostname') === window.location.host &&
    $(this)?.attr('href')?.indexOf('#') === -1 &&
    !$(this).hasClass('no-transition') &&
    $(this).attr('target') !== '_blank'
  ) {
    e.preventDefault();
    const transitionURL = $(this).attr('href');
    delay = 0;
    pageNavigate().then(() => {
      if (transitionURL) {
        window.location.assign(transitionURL);
      }
    });
  } else if ($(this)?.attr('href')?.indexOf('#top')) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
