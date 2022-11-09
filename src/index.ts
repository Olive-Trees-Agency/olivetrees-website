import '$styles/index.css';

import { pageLoad, registerGalleryHorizontalScroll } from './animations';

window.Webflow ||= [];

// On Webflow load
window.Webflow.push(() => {
  pageLoad().then(() => {
    registerGalleryHorizontalScroll();
  });
});
