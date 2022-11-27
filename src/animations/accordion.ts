import { gsap } from 'gsap';

import { debounce } from '../utils';

export const registerAccordion = () => {
  const lists = document.querySelectorAll<HTMLElement>('[accordion-list]');
  if (!lists) return;

  lists.forEach((list) => {
    const accordionItems = [...list.children];

    accordionItems?.forEach((item) => {
      const text = item.querySelector<HTMLElement>('[accordion-item-child=text]');
      const buttons = item.querySelectorAll<HTMLElement>('[accordion-item-child=button]');
      const arrow = item.querySelector<HTMLElement>('[accordion-item-child=arrow]');
      if (!(text && buttons) || buttons.length === 0) return;

      let isOpen = false;

      const tl = gsap.timeline({
        paused: true,
        yoyo: true,
        defaults: {
          ease: 'back.out',
          yoyoEase: true,
        },
      });
      tl.add('start');
      tl.fromTo(text, { height: 0, opacity: 0 }, { height: 'auto' }, 'start');
      tl.fromTo(arrow, { rotate: -45 }, { rotate: 132 }, 'start');
      tl.fromTo(text, { opacity: 0 }, { opacity: 1 });

      // TODO: reverse ease https://greensock.com/forums/topic/28954-how-to-set-reverse-ease/
      buttons.forEach((button) => {
        button.onclick = () => {
          if (!isOpen) {
            tl.play();
            isOpen = true;
          } else {
            tl.reverse();
            isOpen = false;
          }
        };
      });

      window.addEventListener(
        'resize',
        debounce(() => {
          tl.invalidate();
        }, 500)
      );
    });
  });
};
