import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const registerFadeIn = () => {
  (gsap.utils.toArray('[fade-in]') as Array<Element>).forEach((element, index) => {
    const begin = element.getAttribute('begin') ?? undefined;
    const end = element.getAttribute('end') ?? undefined;
    const id = element.getAttribute('scroll-trigger-id');
    const duration = element.getAttribute('duration') ?? 0.5;

    const tl = gsap.timeline({ paused: true });
    tl.from(element, {
      opacity: 0,
      duration: duration,
      ease: 'circ.out(1)',
    });

    ScrollTrigger.create({
      id: id ?? 'fade-in-' + index,
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
}
