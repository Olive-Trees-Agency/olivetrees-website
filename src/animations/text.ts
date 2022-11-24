/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Registers chars slide up animation on all element with the `[chars-slide-up]` html attribute.
 * Optional html attributes:
 * - id
 * - start (ex. top 20%)
 * - stop (ex. top bottom)
 */
export const registerCharsSlideUp = () => {
  (gsap.utils.toArray('[chars-slide-up]') as Array<Element>).forEach((element, index) => {
    const begin = element.getAttribute('begin') ?? undefined;
    const end = element.getAttribute('end') ?? undefined;
    const id = element.getAttribute('scroll-trigger-id');
    const stagger = element.getAttribute('stagger')
      ? parseFloat(element.getAttribute('stagger')!.toString())
      : 0.5;
    const duration = element.getAttribute('duration') ?? 0.5;

    gsap.set(element.querySelectorAll('.text-line'), { overflow: 'hidden' });

    const tl = gsap.timeline({ paused: true });
    tl.from(element.querySelectorAll('.char'), {
      opacity: 0,
      yPercent: 100,
      duration: duration,
      ease: 'back.out(1)',
      stagger: { amount: stagger },
    });

    ScrollTrigger.create({
      id: id ?? 'chars-slide-up-' + index,
      trigger: element,
      start: begin,
      end: end,
      markers: false,
      onEnter: () => tl.play(),
      onLeave: () => tl.reverse(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });
  });
};

/**
 * Registers words slide up animation on all element with the `[words-slide-up]` html attribute.
 * Optional html attributes:
 * - id
 * - start (ex. top 20%)
 * - stop (ex. top bottom)
 */
export const registerWordsSlideUp = () => {
  (gsap.utils.toArray('[words-slide-up]') as Array<HTMLElement>).forEach((element, index) => {
    const begin = element.getAttribute('begin') ?? undefined;
    const end = element.getAttribute('end') ?? undefined;
    const id = element.getAttribute('scroll-trigger-id');
    const stagger = element.getAttribute('stagger')
      ? parseFloat(element.getAttribute('stagger')!.toString())
      : 0.5;
    const duration = element.getAttribute('duration') ?? 0.5;

    gsap.set(element.querySelectorAll('.text-line'), { overflow: 'hidden' });

    const tl = gsap.timeline({ paused: true });
    tl.from(element.querySelectorAll('.word'), {
      opacity: 0,
      yPercent: 100,
      duration: duration,
      ease: 'back.out(1)',
      stagger: { amount: stagger },
    });

    ScrollTrigger.create({
      id: id ?? 'words-slide-up-' + index,
      trigger: element,
      start: begin,
      end: end,
      markers: false,
      onEnter: () => tl.play(),
      onLeave: () => tl.reverse(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });
  });
};
