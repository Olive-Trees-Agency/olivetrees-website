import { registerHorizontalSlideshow } from '../animations';

export const loadContact = () => {
  const list = document.querySelector<HTMLElement>('.contact_hero_testimonials-list');
  const listItem = document.querySelector<HTMLElement>('.contact_hero_testimonials-item');
  if (!(list && listItem)) return;
  const gap = parseFloat(getComputedStyle(listItem).getPropertyValue('margin-right'));
  registerHorizontalSlideshow(list, listItem, gap, 'contact-hero');
};
