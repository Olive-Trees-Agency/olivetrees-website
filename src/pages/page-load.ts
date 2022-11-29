import { simulateEvent } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

import {
  registerCharsSlideUp,
  registerWordsSlideUp,
  registerNavigation,
  registerBackgroundColor,
  registerFadeIn,
} from '../animations';
import { registerSplitText } from '../utils';

let delay = 0.2;

export const pageLoad = (beforeAnimationStart: CallableFunction) => {
  // Register core animations
  registerNavigation();

  if (navigator.hardwareConcurrency > 2) {
    registerSplitText(() => {
      registerCharsSlideUp();
      registerWordsSlideUp();
    }).then(() => {
      registerCharsSlideUp();
      registerWordsSlideUp();
    });
    registerFadeIn();
  }

  registerBackgroundColor();

  // Callback before done loading animation starts
  beforeAnimationStart();

  // Play the lottie animation
  const t = document.querySelector('.transition_background_lottie') as EventTarget;
  simulateEvent(t, 'click');

  return gsap.to('.transition', {
    y: '-101%',
    display: 'none',
    duration: 0.7,
    delay: delay,
    ease: 'expo',
  });
};

export const pageNavigate = () => {
  const t = document.querySelector('.transition_background_lottie') as EventTarget;
  simulateEvent(t, 'click');

  return gsap.to('.transition', {
    y: '0%',
    display: 'block',
    duration: 0.7,
    ease: 'expo',
  });
};

// On link click
$('a').on('click', function (e) {
  const href = $(this)?.attr('href');

  if (
    $(this).prop('hostname') === window.location.host &&
    href?.indexOf('#') === -1 &&
    !$(this).hasClass('no-transition') &&
    $(this).attr('target') !== '_blank'
  ) {
    e.preventDefault();
    delay = 0;
    pageNavigate().then(() => {
      if (href) {
        window.location.assign(href);
      }
    });
    return false;
  }

  if (href && href?.indexOf('#top') > -1) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }

  if (href && href?.indexOf('#') > -1) {
    e.preventDefault();
    const elementId = `#${href.split('#')[1]}`;
    document.querySelector(elementId)?.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
});
