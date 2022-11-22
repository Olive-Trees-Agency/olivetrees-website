import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '$styles/index.css';

import { pageLoad, loadHome } from './pages';
import { matchPhoneAll } from './utils';

window.Webflow ||= [];
gsap.registerPlugin(ScrollTrigger);

// On Webflow load
window.Webflow.push(() => {
  pageLoad(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/home') {
      loadHome();
    }
  });

  // Reload page when rescaled to phone
  matchPhoneAll.addEventListener('change', () => {
    window.location.reload();
  });
});
