import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { registerGalleryHorizontalScroll, registerWebCta, registerHeroHome } from '../animations';

export const loadHome = () => {
  registerHeroHome();
  registerGalleryHorizontalScroll().then(() => {
    // re-calculate all scroll triggers positions
    ScrollTrigger.getAll().forEach((st) => st.refresh());
    registerWebCta();
  });
};
