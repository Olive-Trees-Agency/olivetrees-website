import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { matchPhone, isMobile, matchDesktop, Colors } from '$utils';

export class HeroHomeAnimation {
  private HERO_SECTION_SELECTOR = '.section_hero.is-home';

  private GRID_SELECTOR = '.home_hero_grid';
  private GRID_ITEM_1_SELECTOR = '.home_hero_grid-item.is-1';
  private GRID_ITEM_2_SELECTOR = '.home_hero_grid-item.background-color-grey';
  private GRID_ITEM_3_SELECTOR = '.home_hero_grid-item.is-2';
  private GRID_ITEM_4_SELECTOR = '.home_hero_grid-item.background-color-green';
  private GRID_ITEM_TEXT_WRAPPER_SELECTOR = '.hero_home_grid-item_text-wrapper';
  private GRID_ITEM_TAKE_TOUR_SELECTOR = '.home_hero_grid-item.is-take-tour';

  private SCROLL_BUTTON_SELECTOR = '.home_hero_scroll-lottie-link';
  private CONTACT_BUTTON_SELECTOR = '.hero_contact-lottie-link';

  private _gridElement: HTMLElement | null;
  private _gridItemElements: Array<HTMLElement | null> = [];
  private _gridItem2TextWrapperElement?: HTMLElement | null;
  private _gridItem2TextElements?: HTMLCollection;
  private _gridItem4TextWrapperElement?: HTMLElement | null;
  private _gridItem4TextElements?: HTMLCollection;

  private _scrollButtonElement: HTMLAnchorElement | null;
  private _contactButtonElement: HTMLAnchorElement | null;

  private _currentSectionHeight = 'auto';

  /**
   * Initialize and play the `HeroHomeAnimation`.
   */
  constructor() {
    this.setSectionHeight();

    this._gridElement = document.querySelector(this.GRID_SELECTOR);
    if (this._gridElement) {
      this._gridItemElements = [
        this._gridElement.querySelector(this.GRID_ITEM_1_SELECTOR),
        this._gridElement.querySelector(this.GRID_ITEM_2_SELECTOR),
        this._gridElement.querySelector(this.GRID_ITEM_3_SELECTOR),
        this._gridElement.querySelector(this.GRID_ITEM_4_SELECTOR),
        this._gridElement.querySelector(this.GRID_ITEM_TAKE_TOUR_SELECTOR),
      ];

      this._gridItem2TextWrapperElement = this._gridItemElements[1]?.querySelector(
        this.GRID_ITEM_TEXT_WRAPPER_SELECTOR
      );
      this._gridItem2TextElements = this._gridItem2TextWrapperElement?.children;
      this._gridItem4TextWrapperElement = this._gridItemElements[3]?.querySelector(
        this.GRID_ITEM_TEXT_WRAPPER_SELECTOR
      );
      this._gridItem4TextElements = this._gridItem4TextWrapperElement?.children;
    }

    this._scrollButtonElement = document.querySelector(this.SCROLL_BUTTON_SELECTOR);
    this._contactButtonElement = document.querySelector(this.CONTACT_BUTTON_SELECTOR);

    this.playAnimation();
  }

  private setSectionHeight() {
    const section = document.querySelector(this.HERO_SECTION_SELECTOR);
    if (!section) return;

    const isSectionFullHeightCapable = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const heightDiff = window.innerHeight - section.clientHeight;
      if (aspectRatio > 1.7 && heightDiff < 200 && heightDiff > 0) {
        return true;
      }
      return false;
    };

    // Set section height to 100vh if screen width/height ratio is okay and there is enough space to show content
    if (isSectionFullHeightCapable()) {
      gsap.set(section, { height: '100vh' });
      this._currentSectionHeight = '100vh';
    }

    // Re-evaluate the section heigth when the window is resized
    // when the window is resized all ScrollTriggers should be refreshed because the body height changes
    window.addEventListener('resize', () => {
      if (isSectionFullHeightCapable() && this._currentSectionHeight !== '100vh') {
        gsap.set(section, { height: '100vh' });
        this._currentSectionHeight = '100vh';
        ScrollTrigger.getAll().forEach((st) => st.refresh());
      } else if (this._currentSectionHeight !== 'auto') {
        gsap.set(section, { height: 'auto' });
        this._currentSectionHeight = 'auto';
        ScrollTrigger.getAll().forEach((st) => st.refresh());
      }
    });
  }

  private playAnimation() {
    if (
      !this._gridElement ||
      !this._gridItemElements[0] ||
      !this._gridItemElements[1] ||
      !this._gridItemElements[2] ||
      !this._gridItemElements[3] ||
      !this._gridItemElements[4] ||
      !this._gridItem2TextWrapperElement ||
      !this._gridItem2TextElements ||
      !this._gridItem4TextWrapperElement ||
      !this._gridItem4TextElements ||
      !this._scrollButtonElement ||
      !this._contactButtonElement
    ) {
      // eslint-disable-next-line no-console
      console.error(
        `HeroHomeAnimation | not all elements required for animations where found`,
        this
      );
      return;
    }

    // Set initial state
    gsap.set(this._gridItem2TextWrapperElement, { overflow: 'hidden' });
    gsap.set(this._gridItemElements[1], { backgroundColor: Colors.backgroundGreen });
    gsap.set(this._gridItemElements[3], { backgroundColor: Colors.backgroundOrange });

    if (matchPhone.matches) {
      // Give the grid rows a fixed height during the animation
      const gridItem2CalculatedHeight = this._gridItemElements[1].offsetHeight;
      const gridItem4CalculatedHeight = this._gridItemElements[3].offsetHeight;
      gsap.set(this._gridElement, {
        gridTemplateRows: `0rem 10rem ${gridItem2CalculatedHeight}px ${gridItem4CalculatedHeight}px`,
      });
    }

    if (isMobile() && matchDesktop.matches) {
      gsap.set(this._gridElement, {
        gridTemplateRows: `4rem 4rem 4rem 4rem 4rem 8rem 4rem 4rem`,
      });
    }

    gsap.fromTo(
      this._gridItemElements[4],
      { height: '0%' },
      { height: 'calc(100% + 1.5rem)', delay: 0.8, ease: 'back.out' }
    );
    gsap.fromTo(
      this._gridItemElements[0],
      { height: '0%' },
      { height: '100%', delay: 1, ease: 'back.out' }
    );
    gsap
      .timeline({ delay: 1.2 })
      .fromTo(
        this._gridItemElements[1],
        { height: '0%' },
        { height: '100%', ease: 'circ.out', duration: 0.25 }
      )
      .fromTo(
        this._gridItem2TextWrapperElement,
        { width: '0%', backgroundColor: Colors.backgroundGrey, display: 'none' },
        { width: '100%', display: 'grid', ease: 'circ.out', duration: 0.25 }
      )
      .fromTo(this._gridItem2TextElements, { opacity: 0 }, { opacity: 1 });
    gsap.fromTo(
      this._gridItemElements[2],
      { height: '0%' },
      { height: '100%', delay: 1.4, ease: 'back.out' }
    );
    gsap
      .timeline({ delay: 1.6 })
      .fromTo(
        this._gridItemElements[3],
        { height: '0%' },
        { height: '100%', ease: 'circ.out', duration: 0.25 }
      )
      .fromTo(
        this._gridItem4TextWrapperElement,
        { width: '0%', backgroundColor: Colors.backgroundGreen, display: 'none' },
        { width: '100%', display: 'grid', ease: 'circ.out', duration: 0.25 }
      )
      .fromTo(this._gridItem4TextElements, { opacity: 0 }, { opacity: 1 });

    gsap.fromTo(
      this._scrollButtonElement,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, delay: 2 }
    );

    gsap
      .fromTo(
        this._contactButtonElement,
        { opacity: 0, scale: 5 },
        { opacity: 1, scale: 1, delay: 1.8, ease: 'back.out(2)' }
      )
      .then(() => {
        if (matchPhone.matches) {
          // Reset the grid rows fixed height applied during the animation to auto
          gsap.set(this._gridElement, { gridTemplateRows: `0rem 10rem auto auto` });
        }
      });
  }
}
