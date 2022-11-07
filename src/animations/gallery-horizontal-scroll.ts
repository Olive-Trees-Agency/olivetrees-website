import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const horizontalItem = $('.section_gallery-horizontal_collection-item');
const horizontalSection = $('.section_gallery-horizontal');
let moveDistance;

function calculateScroll() {
  // Desktop
  let itemsInView = 3;
  let scrollSpeed = 0.8;

  if (window.matchMedia('(max-width: 479px)').matches) {
    // Mobile Portrait
    itemsInView = 1;
    scrollSpeed = 1.2;
  } else if (window.matchMedia('(max-width: 767px)').matches) {
    // Mobile Landscape
    itemsInView = 1;
    scrollSpeed = 1.2;
  } else if (window.matchMedia('(max-width: 991px)').matches) {
    // Tablet
    itemsInView = 2;
    scrollSpeed = 1.2;
  }
  let moveAmount = horizontalItem.length - itemsInView;
  let minHeight = scrollSpeed * horizontalItem.outerWidth() * horizontalItem.length;
  if (moveAmount <= 0) {
    moveAmount = 0;
    minHeight = 0;
    // horizontalSection.css('height', '100vh');
  } else {
    horizontalSection.css('height', '200vh');
  }
  moveDistance = horizontalItem.outerWidth() * moveAmount;
  horizontalSection.css('min-height', minHeight + 'px');
}
calculateScroll();
window.onresize = function () {
  calculateScroll();
};

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section_gallery-horizontal_trigger',
    // trigger element - viewport
    start: 'top top',
    end: 'bottom top',
    invalidateOnRefresh: true,
    scrub: 1,
  },
});
tl.to('.section_gallery-horizontal .section_gallery-horizontal_collection-list', {
  x: () => -moveDistance,
  duration: 1,
});
