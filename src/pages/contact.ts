import { registerHorizontalSlideshow } from '../animations';
import { debounce } from '../utils';

export const loadContact = () => {
  registerHeroTestimonials();
  window.addEventListener(
    'resize',
    debounce(() => {
      registerHeroTestimonials();
    }, 500)
  );
};

function registerHeroTestimonials() {
  const list = document.querySelector<HTMLElement>('.contact_hero_testimonials-list');
  const listItem = document.querySelector<HTMLElement>('.contact_hero_testimonials-item');
  if (!(list && listItem)) return;
  const gap = parseFloat(getComputedStyle(listItem).getPropertyValue('margin-right'));
  registerHorizontalSlideshow(list, listItem, gap, 'contact-hero');
}
