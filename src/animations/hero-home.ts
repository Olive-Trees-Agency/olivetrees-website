/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { matchPhone } from '../utils';

export const registerHeroHome = () => {
  const grid = document.querySelector('.home_hero_grid');
  const takeTourElement = document.querySelector('.home_hero_grid-item.is-take-tour');
  const gridItem1 = document.querySelector('.home_hero_grid-item.is-1');
  const gridItem2 = document.querySelector<HTMLElement>(
    '.home_hero_grid-item.background-color-grey'
  );
  const gridItem2TextWrapper = gridItem2!.querySelector('.hero_home_grid-item_text-wrapper');
  const gridItem2Text = gridItem2TextWrapper!.children;
  const gridItem3 = document.querySelector('.home_hero_grid-item.is-2');
  const gridItem4 = document.querySelector<HTMLElement>(
    '.home_hero_grid-item.background-color-green'
  );
  const gridItem4TextWrapper = gridItem4!.querySelector('.hero_home_grid-item_text-wrapper');
  const gridItem4Text = gridItem4TextWrapper!.children;

  const scrollButton = document.querySelector('.home_hero_scroll-lottie-link');
  const contactButton = document.querySelector('.hero_contact-lottie-link');

  setSectionHeight();

  gsap.set(gridItem2TextWrapper, { overflow: 'hidden' });
  gsap.set(gridItem2, { backgroundColor: '#9fca07' });
  gsap.set(gridItem4, { backgroundColor: '#c96c00' });

  if (matchPhone.matches) {
    const gridItem2CalculatedHeight = gridItem2?.offsetHeight;
    const gridItem4CalculatedHeight = gridItem4?.offsetHeight;
    gsap.set(grid, {
      gridTemplateRows: `0rem 10rem ${gridItem2CalculatedHeight}px ${gridItem4CalculatedHeight}px`,
    });
  }

  gsap.fromTo(
    takeTourElement,
    { height: '0%' },
    { height: 'calc(100% + 1.5rem)', delay: 0.8, ease: 'back.out' }
  );
  gsap.fromTo(gridItem1, { height: '0%' }, { height: '100%', delay: 1, ease: 'back.out' });
  gsap
    .timeline({ delay: 1.2 })
    .fromTo(gridItem2, { height: '0%' }, { height: '100%', ease: 'circ.out', duration: 0.25 })
    .fromTo(
      gridItem2TextWrapper,
      { width: '0%', backgroundColor: '#d4d4d4', display: 'none' },
      { width: '100%', display: 'grid', ease: 'circ.out', duration: 0.25 }
    )
    .fromTo(gridItem2Text, { opacity: 0 }, { opacity: 1 });
  gsap.fromTo(gridItem3, { height: '0%' }, { height: '100%', delay: 1.4, ease: 'back.out' });
  gsap
    .timeline({ delay: 1.6 })
    .fromTo(gridItem4, { height: '0%' }, { height: '100%', ease: 'circ.out', duration: 0.25 })
    .fromTo(
      gridItem4TextWrapper,
      { width: '0%', backgroundColor: '#9fca07', display: 'none' },
      { width: '100%', display: 'grid', ease: 'circ.out', duration: 0.25 }
    )
    .fromTo(gridItem4Text, { opacity: 0 }, { opacity: 1 });

  gsap.fromTo(scrollButton, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, delay: 10 });

  gsap
    .fromTo(
      contactButton,
      { opacity: 0, scale: 5 },
      { opacity: 1, scale: 1, delay: 1.8, ease: 'back.out(2)' }
    )
    .then(() => {
      if (matchPhone.matches) {
        gsap.set(grid, { gridTemplateRows: `0rem 10rem auto auto` });
      }
    });
};

function setSectionHeight() {
  const section = document.querySelector('.section_hero.is-home');
  // Set section height to 100vh if screen width/height ratio is okay
  const aspectRatio = window.innerWidth / window.innerHeight;
  if (aspectRatio > 1.8) {
    gsap.set(section, { height: '100vh' });
  }
  window.addEventListener('resize', () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio > 1.8) {
      gsap.set(section, { height: '100vh' });
      // re-calculate all scroll triggers positions
      ScrollTrigger.getAll().forEach((st) => st.refresh());
    } else {
      gsap.set(section, { height: 'auto' });
      // re-calculate all scroll triggers positions
      ScrollTrigger.getAll().forEach((st) => st.refresh());
    }
  });
}
