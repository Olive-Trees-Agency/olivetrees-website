import { simulateEvent } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

import {
  registerCharsSlideUp,
  registerWordsSlideUp,
  registerNavigation,
  registerBackgroundColor,
} from '../animations';
import { registerSplitText } from '../utils';

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
      duration: 1,
      delay: 0.25,
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
      duration: 1,
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
    pageNavigate().then(() => {
      if (transitionURL) {
        window.location.assign(transitionURL);
      }
    });
  }
});
