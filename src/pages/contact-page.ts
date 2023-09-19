import { gsap } from 'gsap';

import { HorizontalSlideshow, Accordion } from '$interactions';
import { debounce } from '$utils';

import { Page } from './page';

export class ContactPage extends Page {
  private HERO_SECTION_SELECTOR = '.section_hero.is-contact';
  private TESTIMONIALS_ITEM_SELECTOR = '.contact_hero_testimonials-item';

  private TESTIMONIALS_SLIDER_ID = 'contact-hero';

  private _testimonialsSlideshow?: HorizontalSlideshow;
  private _accordion: Accordion;

  /**
   * Create a new Contact page
   */
  constructor() {
    super();

    this.setSectionHeight();
    this.initializeTestimonialsSlideshow();

    window.addEventListener('resize', () => {
      debounce(() => {
        this.setSectionHeight();
        this.initializeTestimonialsSlideshow();
      }, 500);
    });

    this._accordion = new Accordion({ initialRotation: -45, expandedRotation: 132 });

    this.finishLoading();
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

    if (isSectionFullHeightCapable()) {
      gsap.set(section, { height: '100vh' });
    } else {
      gsap.set(section, { height: 'auto' });
    }
  }

  private initializeTestimonialsSlideshow() {
    // Get gap between items
    const listItem = document.querySelector(this.TESTIMONIALS_ITEM_SELECTOR);
    if (!listItem) return;
    const gap = parseFloat(getComputedStyle(listItem).getPropertyValue('margin-right'));
    // Initialize or reload interaction
    if (!this._testimonialsSlideshow) {
      this._testimonialsSlideshow = new HorizontalSlideshow(gap, this.TESTIMONIALS_SLIDER_ID);
    } else {
      this._testimonialsSlideshow.reload();
    }
  }
}
