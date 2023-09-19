/* eslint-disable no-console */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class ProjectsHorizontalScroll {
  private SECTION_SELECTOR = '.section_gallery-horizontal';
  private TRIGGER_SELECTOR = '.section_gallery-horizontal_trigger';
  private CONTAINER_SELECTOR = '.container-large';
  private COLLECTION_LIST_SELECTOR = '.section_gallery-horizontal_collection-list';
  private COLLECTION_ITEM_SELECTOR = '.section_gallery-horizontal_collection-item';

  private HEADING_SCROLLTRIGGER_ID = 'horizontal-gallery-heading';
  private CAPTION_SCROLLTRIGGER_ID = 'horizontal-gallery-caption';

  private _sectionElement: HTMLElement | null;
  private _triggerElement: HTMLElement | null;
  private _containerElement?: HTMLElement | null;
  private _collectionListElement: HTMLElement | null;
  private _collectionItemElements: NodeListOf<HTMLElement>;

  private _scrollSpeed = 1;
  private _moveDistance = 0;
  private _previousViewportWidth: number;

  /**
   * Initialize and play the `GalleryScrollAnimation`.
   *
   * Make sure every element on the page has a defined height.
   * Otherwise the gsap scroll trigger can get an offset.
   * This mainly happens when lazy loading images without defined height.
   */
  constructor() {
    this._sectionElement = document.querySelector(this.SECTION_SELECTOR);
    this._triggerElement = document.querySelector(this.TRIGGER_SELECTOR);
    this._containerElement = this._sectionElement?.querySelector(this.CONTAINER_SELECTOR);
    this._collectionListElement = document.querySelector(this.COLLECTION_LIST_SELECTOR);
    this._collectionItemElements = document.querySelectorAll(this.COLLECTION_ITEM_SELECTOR);

    gsap.set(this._triggerElement, { height: 'calc(100% - 100vh)' });
    this.calculateScroll();

    // Only recalculate when the width changes, not when the height changes
    this._previousViewportWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      if (window.innerWidth !== this._previousViewportWidth) {
        this.calculateScroll();
        this._previousViewportWidth = window.innerWidth;
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this._triggerElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
        // onLeaveBack: () => {
        //   ScrollTrigger.getById('horizontal-gallery-heading')?.enable();
        //   ScrollTrigger.getById('horizontal-gallery-caption')?.enable();
        // },
      },
    });

    tl.to(this._collectionListElement, {
      x: () => -this._moveDistance,
      duration: 1,
      // onStart: () => {
      //   ScrollTrigger.getById('horizontal-gallery-heading')?.disable(false, false);
      //   ScrollTrigger.getById('horizontal-gallery-caption')?.disable(false, false);
      // },
      onUpdate: () => {
        // Update the text scrolltriggers so that text doesn't animate out (fix for sticky content).
        ScrollTrigger.getById(this.HEADING_SCROLLTRIGGER_ID)?.refresh();
        ScrollTrigger.getById(this.CAPTION_SCROLLTRIGGER_ID)?.refresh();
      },
    });
  }

  private calculateScroll() {
    const collectionItemWidth = this._collectionItemElements[0].offsetWidth;
    if (!collectionItemWidth) {
      console.error(
        `GalleryScrollAnimation | Can't get width of collection item ${this.COLLECTION_ITEM_SELECTOR}`,
        this._collectionItemElements[0]
      );
      return;
    }

    const containerWidth = this._containerElement?.clientWidth;
    if (!containerWidth) {
      console.error(
        `GalleryScrollAnimation | Can't get width of container ${this.CONTAINER_SELECTOR}`,
        this._containerElement
      );
      return;
    }

    const viewportWidth = window.innerWidth;
    const leftMargin = (viewportWidth - containerWidth) / 2;
    const scrollViewportWidth = viewportWidth - leftMargin;
    const itemsInView = Math.floor(scrollViewportWidth / collectionItemWidth);

    let moveAmount = this._collectionItemElements.length - itemsInView;
    let minHeight = this._scrollSpeed * collectionItemWidth * this._collectionItemElements.length;

    if (moveAmount <= 0) {
      moveAmount = 0;
      minHeight = 0;
      // horizontalSection.css('height', '100vh');
    } else {
      gsap.set(this._sectionElement, { height: '200vh' });
    }

    this._moveDistance = collectionItemWidth * moveAmount;
    gsap.set(this._sectionElement, { minHeight: `${minHeight}px` });
    // re-calculate all scroll triggers positions because we altered the body height
    ScrollTrigger.getAll().forEach((st) => st.refresh());
  }
}
