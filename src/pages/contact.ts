import { gsap } from 'gsap';

import { registerHorizontalSlideshow, registerAccordion } from '../animations';
import { debounce } from '../utils';

export const loadContact = () => {
  setHeroSectionHeight();
  registerHeroTestimonials();
  window.addEventListener(
    'resize',
    debounce(() => {
      setHeroSectionHeight();
      registerHeroTestimonials();
    }, 500)
  );

  registerAccordion();
};

function registerHeroTestimonials() {
  const list = document.querySelector<HTMLElement>('.contact_hero_testimonials-list');
  const listItem = document.querySelector<HTMLElement>('.contact_hero_testimonials-item');
  if (!(list && listItem)) return;
  const gap = parseFloat(getComputedStyle(listItem).getPropertyValue('margin-right'));
  registerHorizontalSlideshow(list, listItem, gap, 'contact-hero');
}

function setHeroSectionHeight() {
  const section = document.querySelector('.section_hero.is-contact');
  if (!section) return;

  // Set section height to 100vh if screen width/height ratio is okay
  const aspectRatio = window.innerWidth / window.innerHeight;
  const heightDiff = window.innerHeight - section?.clientHeight;

  if (aspectRatio > 1.7 && heightDiff < 200) {
    gsap.set(section, { height: '100vh' });
  } else {
    gsap.set(section, { height: 'auto' });
  }
}
