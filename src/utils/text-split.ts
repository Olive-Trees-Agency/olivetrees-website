import SplitType, { SplitTypeOptions } from 'split-type';

import { debounce } from './debounce';
import { isMobile } from './media-queries';

let instance: SplitType;
const options: Partial<SplitTypeOptions> = {
  types: 'lines, words, chars',
  tagName: 'span',
  lineClass: 'text-line',
};

let windowHeight: number;
let windowWidth: number;

export const registerSplitText = async (onRecalculate?: CallableFunction) => {
  // Set in css for better performance.
  // (gsap.utils.toArray('[text-split]') as Array<Element>).forEach((element) => {
  //   gsap.set(element, { fontKerning: 'none' });
  // });

  instance = new SplitType('[text-split]', options);

  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;

  window.addEventListener(
    'resize',
    debounce(() => {
      const newHeight = window.innerHeight;
      const newWidth = window.innerWidth;

      if (newWidth === windowWidth && isMobile()) {
        windowHeight = newHeight;
        return;
      }

      instance.revert();
      instance.split(options);
      if (onRecalculate) onRecalculate();
    }, 500)
  );

  return instance;
};
