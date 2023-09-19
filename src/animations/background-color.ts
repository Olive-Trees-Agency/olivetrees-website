/* eslint-disable @typescript-eslint/no-explicit-any */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getTextColor } from '$utils';

gsap.registerPlugin(ScrollTrigger);

export class BackgroundColorAnimation {
  private ANIMATE_BACKGROUND_ELEMENT = '[animate-background]';

  private _elements: NodeListOf<Element>;
  public get elements(): NodeListOf<Element> {
    return this._elements;
  }

  private _scrollTriggers: Array<globalThis.ScrollTrigger>;
  public get scrollTriggers(): ReadonlyArray<globalThis.ScrollTrigger> {
    return [...this._scrollTriggers];
  }

  /**
   * Initialize the background color animation.
   *
   * All elements with the `animate-background` attribute set will have the animation, this attribute should contain the color value to animatie to.
   * The `text-color` attribute defines the body text color for the corresponding background color.
   * If the `text-color`attribute is not defined black or white is picked based on the contrast ratio to the background color.
   */
  constructor() {
    this._elements = document.querySelectorAll(this.ANIMATE_BACKGROUND_ELEMENT);
    this._scrollTriggers = [];

    this._elements.forEach((el, i) => {
      this._scrollTriggers.push(
        ScrollTrigger.create({
          // Add id for indicator of markers if enabled
          id: `animate-background-${i}`,
          trigger: el,
          start: 'top 20%',
          end: 'bottom 80%',
          markers: false,
          onEnter: this.setColor,
          onLeave: this.resetColor,
          onEnterBack: this.setColor,
          onLeaveBack: this.resetColor,
          // This calls the invalidate method on viewport resize
          invalidateOnRefresh: true,
        })
      );
    });
  }

  private setColor(scrollTrigger: any) {
    // Add a property to the ScrollTrigger object to store the old background in
    scrollTrigger.oldBodyBackground = gsap.getProperty('body', 'backgroundColor');
    const backgroundColor = scrollTrigger.trigger?.getAttribute('animate-background');
    const textColor =
      scrollTrigger.trigger?.getAttribute('text-color') ?? getTextColor(backgroundColor);

    // The color animation properties are set on the body element using CSS
    gsap.set('body', {
      backgroundColor: backgroundColor,
    });
    gsap.set('body', {
      color: textColor,
    });
  }

  private resetColor(scrollTrigger: any) {
    const backgroundColor = scrollTrigger.oldBodyBackground;
    const textColor = getTextColor(backgroundColor);
    gsap.set('body', {
      backgroundColor: backgroundColor,
    });
    gsap.set('body', {
      color: textColor,
    });
  }

  /**
   * Kill all the `scrollTrigger` animations.
   */
  public dispose() {
    this._scrollTriggers.forEach((scrollTrigger) => {
      scrollTrigger.kill();
    });

    this._scrollTriggers = [];
  }
}
