import SplitType, { SplitTypeOptions } from 'split-type';

import { debounce } from './debounce';

let instance: SplitType;
const options: Partial<SplitTypeOptions> = {
  types: 'lines, words, chars',
  tagName: 'span',
  lineClass: 'text-line',
};

export const registerSplitText = async (onRecalculate?: CallableFunction) => {
  // Set in css for better performance.
  // (gsap.utils.toArray('[text-split]') as Array<Element>).forEach((element) => {
  //   gsap.set(element, { fontKerning: 'none' });
  // });

  instance = new SplitType('[text-split]', options);

  window.addEventListener(
    'resize',
    debounce(() => {
      instance.revert();
      instance.split(options);
      if (onRecalculate) onRecalculate();
    }, 500)
  );

  return instance;
};
