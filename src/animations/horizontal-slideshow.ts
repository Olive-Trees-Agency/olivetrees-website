import { gsap } from 'gsap';

let scrollTween: gsap.core.Tween | null;

export const registerHorizontalSlideshow = (
  list: HTMLElement,
  listItem: HTMLElement,
  gap: number,
  instanceName: string
) => {
  const buttonLeft = document.querySelector(`[slideshow-button-left=${instanceName}]`);
  const buttonRight = document.querySelector(`[slideshow-button-right=${instanceName}]`);
  if (!(buttonLeft && buttonRight)) return;
  const listWidth = parseFloat(getComputedStyle(list).getPropertyValue('width'));
  const itemWidth = parseFloat(getComputedStyle(listItem).getPropertyValue('width'));
  let maxLeftScroll = Math.max(listWidth / (itemWidth + gap));
  let maxRightScroll = 0;

  const hideButtonRight = gsap
    .timeline({ paused: false })
    .to(buttonRight, { opacity: 0, cursor: 'auto' });
  const hideButtonLeft = gsap
    .timeline({ paused: true })
    .to(buttonLeft, { opacity: 0, cursor: 'auto' });

  buttonLeft.addEventListener('click', () => {
    if (maxLeftScroll > 0) {
      scroll(list, itemWidth, gap, '-');
      maxLeftScroll -= 1;
      maxRightScroll += 1;
      if (hideButtonRight.progress() === 1) {
        hideButtonRight.reverse();
      }
    }

    if (maxLeftScroll <= 0) {
      hideButtonLeft.play();
    }
  });

  buttonRight.addEventListener('click', () => {
    if (maxRightScroll > 0) {
      scroll(list, itemWidth, gap, '+');
      maxLeftScroll += 1;
      maxRightScroll -= 1;
      if (hideButtonLeft.progress() === 1) {
        hideButtonLeft.reverse();
      }
    }

    if (maxRightScroll <= 0) {
      hideButtonRight.play();
    }
  });
};

function scroll(list: HTMLElement, width: number, gap: number, direction: '-' | '+') {
  const translationDistance = Math.floor(width + gap);
  if (scrollTween) scrollTween.progress(1);
  scrollTween = gsap.to(list, {
    x: `${direction}=${translationDistance}`,
    duration: 1,
    ease: 'back.out(2)',
  });

  scrollTween.then((self) => {
    self.kill();
    scrollTween = null;
  });
}
