import { simulateEvent } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import SplitType from 'split-type';

import { matchPhoneAll } from '$utils';

export class PhoneNavigationAnimation {
  private textSplit?: SplitType;
  private tl?: gsap.core.Timeline | null;

  private NAVIGATION_LINKS_WRAPPER = '[navigation="links-wrapper"]';
  private navigationLinksWrapper?: Element | null;

  private NAVIGATION_LINK = '[navigation="link"]';
  private navigationLinks?: NodeListOf<Element> | null;

  private NAVIGATION_LINK_DESCRIPTION = '[navigation="link-description"]';
  private navigationLinkDescriptions?: NodeListOf<Element> | null;

  private NAVIGATION_LOGO = '[navigation="logo"]';
  private logo?: Element | null;

  private NAVIGATION_MENU_BUTTON = '[navigation="menu-button"]';
  private menuButton?: Element | null;

  private _isMenuOpen = false;
  public get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  /**
   * Initialize the Phone navigation animations.
   */
  constructor() {
    // Only register navigation on phone
    if (!matchPhoneAll.matches) return;

    this.navigationLinksWrapper = document.querySelector(this.NAVIGATION_LINKS_WRAPPER);
    this.navigationLinks =
      this.navigationLinksWrapper?.querySelectorAll(this.NAVIGATION_LINK) ?? null;
    this.navigationLinkDescriptions =
      this.navigationLinksWrapper?.querySelectorAll(this.NAVIGATION_LINK_DESCRIPTION) ?? null;
    this.logo = document.querySelector(this.NAVIGATION_LOGO);
    this.menuButton = document.querySelector(this.NAVIGATION_MENU_BUTTON);

    // Stop if elements not found
    if (!this.navigationLinksWrapper || !this.logo || !this.menuButton || !this.navigationLinks)
      return;

    // Split text for animation
    this.textSplit = new SplitType(this.NAVIGATION_LINK, {
      types: 'lines, words, chars',
      tagName: 'span',
      lineClass: 'text-line',
    });
    // Fix for text split
    gsap.set(this.navigationLinkDescriptions, { display: 'flex' });

    // Create animation timeline
    this.tl = gsap.timeline({ paused: true });
    this.tl.add('start');
    this.tl.set('body', { height: '100%', overflow: 'hidden' });
    this.tl.fromTo(
      this.navigationLinksWrapper,
      {
        yPercent: -100,
        display: 'none',
        translateY: '-100%',
      },
      {
        yPercent: 0,
        display: 'grid',
        translateY: '0%',
        ease: 'circ.out(2)',
      },
      'start'
    );
    this.tl.to(this.menuButton, { filter: 'invert(1)' }, 'start');
    this.tl.to(this.logo, { color: '#000000' }, 'start');
    this.tl.add('f2');
    this.tl.fromTo(this.navigationLinksWrapper.children, { opacity: 0 }, { opacity: 1 }, 'f2');
    this.tl.from(
      this.navigationLinksWrapper.querySelectorAll('.char'),
      {
        opacity: 0,
        yPercent: 100,
        ease: 'back.out(2)',
        stagger: { amount: 0.5 },
      },
      'f2'
    );
    this.tl.fromTo(
      this.navigationLinks,
      { borderColor: 'transparent' },
      { borderColor: '#000000' }
    );

    // Add event listener
    this.menuButton.addEventListener('click', this.menuToggle);
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        if (this._isMenuOpen && this.menuButton) {
          simulateEvent(this.menuButton, 'click');
        }
      }
    });
  }

  /**
   * Toggle the navigation menu.
   */
  public menuToggle() {
    if (this._isMenuOpen) {
      this.tl?.reverse();
      this._isMenuOpen = false;
    } else {
      this.tl?.play();
      this._isMenuOpen = true;
    }
  }

  /**
   * Dispose the animation and reset to initial state.
   */
  public dispose() {
    this.textSplit?.revert();
    this.tl?.kill();
    this.tl = null;
    this.navigationLinkDescriptions?.forEach((description) => {
      description.removeAttribute('style');
    });
    this.navigationLinks?.forEach((navLink) => {
      navLink.removeAttribute('style');
    });
    this.navigationLinksWrapper?.removeAttribute('style');
    if (this.navigationLinksWrapper?.children) {
      for (let i = 0; i < this.navigationLinksWrapper?.children.length; i++) {
        this.navigationLinksWrapper.children[i].removeAttribute('style');
      }
    }
    this.logo?.removeAttribute('style');
    this.menuButton?.removeAttribute('style');
    this.menuButton?.removeEventListener('click', this.menuToggle);
    // If navigation still open play lottie animation so that next time menu item is shon instead of X
    if (this._isMenuOpen && this.menuButton) {
      simulateEvent(this.menuButton, 'click');
      this._isMenuOpen = false;
    }
  }
}
