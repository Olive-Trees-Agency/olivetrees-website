import { simulateEvent } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '$styles/index.css';

import { pageLoad, loadHome, loadContact } from './pages';
import { matchPhoneAll, matchDesktop, isMobile } from './utils';

window.Webflow ||= [];
gsap.registerPlugin(ScrollTrigger);

const testRelease = false;

// On Webflow load
window.Webflow.push(() => {
  const { host } = window.location;
  if (!host.includes('webflow.io') || testRelease) {
    const date = new Date();
    const releaseDate = testRelease
      ? date.setMinutes(date.getMinutes() + 1)
      : new Date('2022-11-29T19:00:00');

    if (!(date > releaseDate)) {
      gsap.set('body', { height: '100%', overflow: 'hidden' });
      gsap.set('.transition', { display: 'none' });
      gsap.set('.under-construction', { display: 'flex' });

      function clock() {
        const clockElement = document.querySelector('.under-construction_text.is-time');
        const date = new Date();
        if (!clockElement) return;
        clockElement.innerHTML = `${date.toLocaleString('nl-be')}`;

        if (date > releaseDate) {
          window.location.reload();
        }
        setTimeout(clock, 1000);
      }
      clock();

      return;
    }
  }

  pageLoad(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/home') {
      loadHome();
    } else if (currentPath === '/contact') {
      loadContact();
    }

    // Custom cursor
    if (matchDesktop.matches && !isMobile()) {
      const cursor = document.querySelector('.cursor');
      if (cursor) {
        $('a, button, input, textarea, [cursor-target]').on('mouseenter', () => {
          gsap.to(cursor, { fontSize: '2rem', opacity: 0.8, ease: 'back.out(2)' });
        });

        $('a, button, input, textarea, [cursor-target]').on('mouseleave', () => {
          gsap.to(cursor, { fontSize: '1rem', opacity: 1, ease: 'back.out(2)' });
        });
      }
    }
  });

  // Reload page when rescaled to phone
  matchPhoneAll.addEventListener('change', () => {
    window.location.reload();
  });
});

// Reload on orientation change
screen.orientation.addEventListener('change', () => {
  console.log('test');
  window.location.reload();
})
