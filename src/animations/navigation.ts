import { simulateEvent } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import SplitType from 'split-type';

import { matchPhoneAll } from '../utils';

let textSplit: SplitType;
let open = false;
let navigation: Element | null;
let navigationLinks: NodeListOf<Element> | null;
let navigationLinkDescriptions: NodeListOf<Element> | null;
let logo: Element | null;
let menuButton: Element | null;
let tl: gsap.core.Timeline | null;

export const registerNavigation = () => {
  // Only register navigation on phone
  if (!matchPhoneAll.matches) return;

  navigation = document.querySelector('.navbar_navigation');
  navigationLinks = navigation?.querySelectorAll('.navbar_navigation_link') ?? null;
  navigationLinkDescriptions = document.querySelectorAll('.navbar_navigation_link_description');
  logo = document.querySelector('.navbar_logo_link');
  menuButton = document.querySelector('.navbar_menu-button');
  if (!navigation || !logo || !menuButton || !navigationLinks) return;

  // Split text for animation
  textSplit = new SplitType('.navbar_navigation_link', {
    types: 'lines, words, chars',
    tagName: 'span',
    lineClass: 'text-line',
  });
  // Fix for text split
  gsap.set(navigationLinkDescriptions, { display: 'flex' });

  tl = gsap.timeline({ paused: true });
  tl.add('start');
  tl.set('body', { height: '100%', overflow: 'hidden' });
  tl.fromTo(
    navigation,
    {
      yPercent: -100,
      display: 'none',
      translateY: '-100%',
    },
    {
      yPercent: 0,
      display: 'grid',
      translateY: '0%',
      ease: 'circ.out(2)',
    },
    'start'
  );
  tl.to(menuButton, { filter: 'invert(1)' }, 'start');
  tl.to(logo, { color: '#000000' }, 'start');
  tl.add('f2');
  tl.fromTo(navigation.children, { opacity: 0 }, { opacity: 1 }, 'f2');
  tl.from(
    navigation.querySelectorAll('.char'),
    {
      opacity: 0,
      yPercent: 100,
      ease: 'back.out(2)',
      stagger: { amount: 0.5 },
    },
    'f2'
  );
  tl.fromTo(navigationLinks, { borderColor: 'transparent' }, { borderColor: '#000000' });

  menuButton.addEventListener('click', menuButtonClick);
};

function menuButtonClick() {
  if (open) {
    tl?.reverse();
    open = false;
  } else {
    tl?.play();
    open = true;
  }
}

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    if (open && menuButton) {
      simulateEvent(menuButton, 'click');
    }
  }
});

export const unregisterNavigation = () => {
  textSplit?.revert();
  tl?.kill();
  tl = null;
  navigationLinkDescriptions?.forEach((description) => {
    description.removeAttribute('style');
  });
  navigationLinks?.forEach((navLink) => {
    navLink.removeAttribute('style');
  });
  navigation?.removeAttribute('style');
  if (navigation?.children) {
    for (let i = 0; i < navigation?.children.length; i++) {
      navigation.children[i].removeAttribute('style');
    }
  }
  logo?.removeAttribute('style');
  menuButton?.removeAttribute('style');
  menuButton?.removeEventListener('click', menuButtonClick);
  // If navigation still open play lottie animation so that next time menu item is shon instead of X
  if (open && menuButton) {
    simulateEvent(menuButton, 'click');
    open = false;
  }
};
