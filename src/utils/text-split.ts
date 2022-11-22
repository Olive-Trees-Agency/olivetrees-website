import SplitType from 'split-type';

export const registerSplitText = async () => {
  // Set in css for better performance.
  // (gsap.utils.toArray('[text-split]') as Array<Element>).forEach((element) => {
  //   gsap.set(element, { fontKerning: 'none' });
  // });

  return new SplitType('[text-split]', {
    types: 'lines, words, chars',
    tagName: 'span',
    lineClass: 'text-line',
  });
};
