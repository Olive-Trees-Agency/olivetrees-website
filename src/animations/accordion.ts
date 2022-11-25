import { gsap } from 'gsap';

import { debounce } from '../utils';

export const registerAccordion = () => {
  const lists = document.querySelectorAll<HTMLElement>('[accordion-list]');
  if (!lists) return;

  lists.forEach((list) => {
    const accordionItems = [...list.children];

    accordionItems?.forEach((item) => {
      const text = item.querySelector<HTMLElement>('[accordion-item-child=text]');
      const button = item.querySelector<HTMLElement>('[accordion-item-child=button]');
      if (!(text && button)) return;

      let isOpen = false;

      const tl = gsap.timeline({ paused: true });
      tl.add('start');
      tl.fromTo(text, { height: 0, opacity: 0 }, { height: 'auto', ease: 'back.out(2)' }, 'start');
      tl.fromTo(button, { rotate: -45 }, { rotate: 132, ease: 'back.out(2)' }, 'start');
      tl.fromTo(text, { opacity: 0 }, { opacity: 1, ease: 'circ' });

      // TODO: reverse ease https://greensock.com/forums/topic/28954-how-to-set-reverse-ease/
      button.onclick = () => {
        if (!isOpen) {
          tl.play();
          isOpen = true;
        } else {
          tl.reverse();
          isOpen = false;
        }
      };

      window.addEventListener(
        'resize',
        debounce(() => {
          tl.invalidate();
        }, 500)
      );
    });
  });
};
