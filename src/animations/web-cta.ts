import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ScrollTriggerAttributes, TimelineAttributes } from '$models/gsap-attributes';
import { rgba2hex, matchPhone, Colors } from '$utils';

import { ScrollAnimation } from './scroll-animation';

gsap.registerPlugin(ScrollTrigger);

export class WebCtaAnimation extends ScrollAnimation {
  private ELEMENT_TEXT_WRAPPER_SELECTOR = '.section_web-cta_grid-item_text-grid';

  private SCROLLTRIGGER_ID = 'web-cta';

  /**
   * Initialize the Web CTA section animation.
   */
  constructor() {
    super('.section_web-cta_grid-item.is-1,.is-3,.is-5');
    this.initialize();
  }

  protected initialize() {
    this._elements.forEach((element, i) => {
      const stAttributes = new ScrollTriggerAttributes(element);
      const tlAttributes = new TimelineAttributes(element);

      const textWrapper = element.querySelector<HTMLElement>(this.ELEMENT_TEXT_WRAPPER_SELECTOR);
      const textWrapperHeight = textWrapper?.offsetHeight;
      const textWrapperChildren = textWrapper?.children || [];

      const elementBackgroundColor = rgba2hex(window.getComputedStyle(element).backgroundColor);

      if (element.className.includes('is-1')) {
        gsap.set(element, {
          backgroundColor: Colors.darkGreen,
        });
      }

      if (element.className.includes('is-3')) {
        gsap.set(element, {
          backgroundColor: Colors.darkOrange,
        });
      }

      if (element.className.includes('is-5')) {
        gsap.set(element, {
          backgroundColor: Colors.backgroundGrey,
        });
      }

      // Set opacity to avoid flickering
      gsap.set(textWrapperChildren, { opacity: 0 });
      if (matchPhone.matches) {
        // Set height to enable auto height defined by content
        gsap.set(element, { height: textWrapperHeight });
      }
      // Make responsive
      matchPhone.addEventListener('change', (e) => {
        if (e.matches) {
          // Set height to enable auto height defined by content
          gsap.set(element, { height: textWrapperHeight });
        } else {
          gsap.set(element, { height: '100%' });
        }
      });

      const tl = gsap.timeline({ paused: true, delay: tlAttributes.delay });
      this._timelines.push(tl);
      // tl.fromTo(element, { height: '0%' }, { height: '100%', ease: 'circ.out', duration: 0.75 });
      // animating the `display` property is important to avoid padding block from being shown before animation starts
      tl.fromTo(
        textWrapper,
        { width: '0%', backgroundColor: elementBackgroundColor, display: 'none' },
        { width: '100%', display: 'grid', ease: 'circ.out', duration: 0.75 }
      );
      tl.to(textWrapperChildren, { opacity: 1 });

      this._scrollTriggers.push(
        ScrollTrigger.create({
          id: `${this.SCROLLTRIGGER_ID}-${i}`,
          trigger: element,
          start: stAttributes.begin,
          end: stAttributes.end,
          markers: false,
          onEnter: () => tl.play(),
          onLeave: () => tl.reverse(0.75),
          onEnterBack: () => tl.play(),
          onLeaveBack: () => tl.reverse(0.75),
        })
      );
    });
  }
}
