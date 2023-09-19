import { simulateEvent } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

export class NavigationTransitionAnimation {
  private PAGE_TRANSITION_WRAPPER = '[page-transition="wrapper"]';
  private PAGE_TRANSITION_LOTTIE = '[page-transition="lottie"]';
  private PAGE_TRANSITION_LOGO = '[page-transition="logo"]';
  private ANCHOR_NO_PAGE_TRANSITION = '[page-transition="disable"]';

  private _anchorElements: NodeListOf<HTMLAnchorElement>;

  /**
   * Listen for click and pageshow events.
   * - Automatically play the page transition when page navigation is detected
   * - Handle scroll to top navigation (`href="#top"`)
   * - Handle anchor links navigation (`href` includes #)
   */
  constructor() {
    this._anchorElements = document.querySelectorAll('a');
    this._anchorElements.forEach((anchorElement) => {
      anchorElement.addEventListener('click', (e) => {
        this.anchorClickHandler(e);
      });
    });

    window.addEventListener('pageshow', (e) => {
      this.pageShowHandler(e);
    });
  }

  private anchorClickHandler(e: MouseEvent) {
    // Use currentTarget instead of target to get the element where the handler is attached to instead of the clicked element (ex. nested elements inside a tag)
    const anchorElement = e.currentTarget as HTMLAnchorElement;
    const href = anchorElement.getAttribute('href');
    const target = anchorElement.getAttribute('target');

    // Handle normal links that navigate to a page from this website (no anchor links)
    if (
      anchorElement.hostname === window.location.host &&
      href?.indexOf('#') === -1 &&
      !(anchorElement.getAttribute('page-transition') === 'disable') &&
      target !== '_blank'
    ) {
      e.preventDefault();
      this.playPageTransition('in', 0).then(() => {
        if (href) window.location.assign(href);
      });
      return;
    }

    // Handle scroll to top links
    if (href && href?.indexOf('#top') > -1) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Handle anchor links
    if (href && href.indexOf('#') > -1 && href.length > 1) {
      e.preventDefault();
      const elementId = `#${href.split('#')[1]}`;
      document.querySelector(elementId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private pageShowHandler(e: PageTransitionEvent) {
    if (e.persisted) {
      // Page wa restored from the bfcache: https://web.dev/bfcache/
      // Play the lottie animation
      return this.playPageTransition('out');
    }
  }

  /**
   * Play the page transition for navigating between pages.
   * @param direction The direction of the transition.
   * @param delay The delay in seconds.
   */
  public async playPageTransition(direction: 'in' | 'out', delay = 0.2) {
    // Play the lottie animation
    const lottie = document.querySelector(this.PAGE_TRANSITION_LOTTIE) as EventTarget;
    simulateEvent(lottie, 'click');

    if (direction === 'in') {
      gsap.set(this.PAGE_TRANSITION_LOGO, { opacity: 0 });
    }

    const backgroundAnimation = gsap.to(this.PAGE_TRANSITION_WRAPPER, {
      y: direction === 'in' ? '0%' : '-101%',
      display: direction === 'in' ? 'block' : 'none',
      duration: 0.7,
      delay: direction === 'in' ? 0 : delay,
      ease: 'expo',
    });

    if (direction === 'in') {
      await backgroundAnimation;
      return await gsap.to(this.PAGE_TRANSITION_LOGO, { opacity: 1, duration: 0.25 });
    }

    return backgroundAnimation;
  }

  public dispose() {
    this._anchorElements.forEach((anchorElement) => {
      anchorElement.removeEventListener('click', this.anchorClickHandler);
    });
    window.removeEventListener('pageshow', this.pageShowHandler);
  }
}
