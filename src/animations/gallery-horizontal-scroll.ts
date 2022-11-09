import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Make sure every element on the page has a defined height.
 * Otherwise the gsap scroll trigger can get an offset.
 * This mainly happens when lazy loading images without defined height.
 */
export const registerGalleryHorizontalScroll = () => {
  $('.section_gallery-horizontal_trigger').css('height', 'calc(100% - 100vh)');

  const horizontalItem = $('.section_gallery-horizontal_collection-item');
  const horizontalSection = $('.section_gallery-horizontal');
  const container = $('.container-large');

  let moveDistance: number;

  function calculateScroll() {
    const horizontalItemWidth = horizontalItem.outerWidth();
    if (horizontalItemWidth == null) return;
    const containerWidth = container.innerWidth();
    if (containerWidth == null) return;
    const viewportWidth = window.innerWidth;

    const leftMargin = (viewportWidth - containerWidth) / 2;
    const scrollViewportWidth = viewportWidth - leftMargin;

    // Desktop
    const itemsInView = Math.floor(scrollViewportWidth / horizontalItemWidth);
    let scrollSpeed = 1;

    if (window.matchMedia('(max-width: 479px)').matches) {
      // Mobile Portrait
      scrollSpeed = 1.2;
    } else if (window.matchMedia('(max-width: 767px)').matches) {
      // Mobile Landscape
      scrollSpeed = 1.2;
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      // Tablet
      scrollSpeed = 1.2;
    }

    let moveAmount = horizontalItem.length - itemsInView;
    let minHeight = scrollSpeed * horizontalItemWidth * horizontalItem.length;

    if (moveAmount <= 0) {
      moveAmount = 0;
      minHeight = 0;
      // horizontalSection.css('height', '100vh');
    } else {
      horizontalSection.css('height', '200vh');
    }

    moveDistance = horizontalItemWidth * moveAmount;
    horizontalSection.css('min-height', minHeight + 'px');
  }

  calculateScroll();

  let resizeTimeout: number;
  window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => calculateScroll(), 500);
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section_gallery-horizontal_trigger',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
      markers: true,
      invalidateOnRefresh: true,
    },
  });

  tl.to('.section_gallery-horizontal_collection-list', {
    x: () => -moveDistance,
    duration: 1,
  });
};
