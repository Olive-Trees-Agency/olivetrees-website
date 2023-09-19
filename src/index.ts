import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Page, HomePage, ContactPage } from '$pages';
import { autoPlayVideos, checkUnderConstruction } from '$utils';

window.Webflow ||= [];
gsap.registerPlugin(ScrollTrigger);

// Run after Webflow load
window.Webflow.push(() => {
  checkUnderConstruction(new Date('2022-11-29T19:00:00'));
  autoPlayVideos();

  const currentPath = window.location.pathname;
  switch (currentPath) {
    case '/':
    case '/home':
      new HomePage();
      break;
    case '/contact':
      new ContactPage();
      break;
    default:
      new Page();
      break;
  }
});
