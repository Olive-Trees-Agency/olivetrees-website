import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { rgba2hex, matchPhone } from '../utils';

gsap.registerPlugin(ScrollTrigger);

export const registerWebCta = () => {
  const start = 'top 80%';
  const end = 'bottom top';
  const delay = 0;

  (gsap.utils.toArray('.section_web-cta_grid-item.is-1,.is-3,.is-5') as Array<HTMLElement>).forEach(
    (element) => {
      const textGrid = element.querySelector<HTMLElement>('.section_web-cta_grid-item_text-grid');
      const textGridChildren = textGrid?.children || [];

      const backgroundColor = rgba2hex($(element).css('background-color'));
      const textGridCalculatedHeight = textGrid?.offsetHeight;

      if (element.className.includes('is-1')) {
        gsap.set(element, {
          backgroundColor: '#8BB005',
        });
      }

      if (element.className.includes('is-3')) {
        gsap.set(element, {
          backgroundColor: '#B05E00',
        });
      }

      if (element.className.includes('is-5')) {
        gsap.set(element, {
          backgroundColor: '#d4d4d4',
        });
      }

      // Set opacity to avoid flickering
      gsap.set(textGridChildren, { opacity: 0 });
      if (matchPhone.matches) {
        // Set height to enable auto height defined by content
        gsap.set(element, { height: textGridCalculatedHeight });
      }
      matchPhone.addEventListener('change', (e) => {
        if (e.matches) {
          // Set height to enable auto height defined by content
          gsap.set(element, { height: textGridCalculatedHeight });
        } else {
          gsap.set(element, { height: '100%' });
        }
      });

      const tl = gsap.timeline({ paused: true, delay: delay });

      ScrollTrigger.create({
        id: 'web-cta-text',
        trigger: element,
        start: start,
        end: end,
        markers: false,
        onEnter: () => tl.play(),
        onLeave: () => tl.reverse(0.75),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse(0.75),
      });

      // tl.fromTo(element, { height: '0%' }, { height: '100%', ease: 'circ.out', duration: 0.75 });
      // animating the `display` property is important to avoid padding block from being shown before animation starts
      tl.fromTo(
        textGrid,
        { width: '0%', backgroundColor: backgroundColor, display: 'none' },
        { width: '100%', display: 'grid', ease: 'circ.out', duration: 0.75 }
      );
      tl.to(textGridChildren, { opacity: 1 });
    }
  );

  // (gsap.utils.toArray('.section_web-cta_grid-item.is-2,.is-4,.is-6') as Array<HTMLElement>).forEach(
  //   (element) => {
  //     const tl = gsap.timeline({ paused: true, delay: delay });

  //     ScrollTrigger.create({
  //       id: 'web-cta-image',
  //       trigger: element,
  //       start: start,
  //       end: end,
  //       markers: true,
  //       onEnter: () => tl.play(),
  //       onLeave: () => tl.reverse(),
  //       onEnterBack: () => tl.play(),
  //       onLeaveBack: () => tl.reverse(),
  //     });

  //     tl.fromTo(element, { height: '0%' }, { height: '100%', ease: 'circ.out', duration: 0.75 });
  //   }
  // );
};
