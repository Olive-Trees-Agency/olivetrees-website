/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { gsap } from 'gsap';

import { debounce } from '../utils';

export const registerTextLoop = () => {
  const elements = document.querySelectorAll<HTMLElement>('[text-loop]');
  if (!elements || elements.length < 1) return;

  elements.forEach((element) => {
    const text = element.firstChild;
    if (!text) return;

    const textClone = text.cloneNode(true);
    element.append(textClone);
    let tween;
    tween = startLoop(element, tween);

    window.addEventListener(
      'resize',
      debounce(() => {
        startLoop(element);
      }, 500)
    );
  });
};

function startLoop(element: HTMLElement, tween?: gsap.core.Tween) {
  const progress = tween ? tween.progress() : 0;
  tween?.progress(0).kill();

  const width = parseInt(
    getComputedStyle(element.firstChild as HTMLElement).getPropertyValue('width'),
    10
  );
  const gap = parseInt(getComputedStyle(element).getPropertyValue('column-gap'), 10);
  const translationDistance = -1 * (width + gap);

  const returnTween = gsap.fromTo(
    element.children,
    { x: 0 },
    { x: translationDistance, duration: 20, repeat: -1, ease: 'none' }
  );
  returnTween.progress(progress);

  return returnTween;
}
