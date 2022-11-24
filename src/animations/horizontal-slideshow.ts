import { gsap } from 'gsap';

let scrollTween: gsap.core.Tween | null;
let buttonRightTl: gsap.core.Timeline | null;
let buttonLeftTl: gsap.core.Timeline | null;
let isInitialized = false;

export const registerHorizontalSlideshow = (
  list: HTMLElement,
  listItem: HTMLElement,
  gap: number,
  instanceName: string
) => {
  const buttonLeft = document.querySelector<HTMLElement>(`[slideshow-button-left=${instanceName}]`);
  const buttonRight = document.querySelector<HTMLElement>(
    `[slideshow-button-right=${instanceName}]`
  );
  if (!(buttonLeft && buttonRight)) return;
  const listWidth = parseFloat(getComputedStyle(list).getPropertyValue('width'));
  const itemWidth = parseFloat(getComputedStyle(listItem).getPropertyValue('width'));
  let maxLeftScroll = Math.max(listWidth / (itemWidth + gap));
  let maxRightScroll = 0;

  if (!isInitialized) {
    buttonRightTl = gsap.timeline({ paused: false });
    buttonLeftTl = gsap.timeline({ paused: true });
  } else {
    buttonRightTl?.progress(0).kill();
    buttonLeftTl?.progress(0).kill();
    buttonRightTl = gsap.timeline({ paused: false });
    buttonLeftTl = gsap.timeline({ paused: true });

    gsap
      .to(list, {
        x: 0,
        duration: 1,
        ease: 'back.out(2)',
      })
      .then((self) => self.kill());
  }

  buttonRightTl?.to(buttonRight, { opacity: 0, cursor: 'auto' });
  buttonLeftTl?.to(buttonLeft, { opacity: 0, cursor: 'auto' });

  buttonLeft.onclick = () => {
    if (maxLeftScroll > 0) {
      scroll(list, itemWidth, gap, '-');
      maxLeftScroll -= 1;
      maxRightScroll += 1;
      if (buttonRightTl?.progress() === 1) {
        buttonRightTl?.reverse();
      }
    }

    if (maxLeftScroll <= 0) {
      buttonLeftTl?.play();
    }
  };

  buttonRight.onclick = () => {
    if (maxRightScroll > 0) {
      scroll(list, itemWidth, gap, '+');
      maxLeftScroll += 1;
      maxRightScroll -= 1;
      if (buttonLeftTl?.progress() === 1) {
        buttonLeftTl?.reverse();
      }
    }

    if (maxRightScroll <= 0) {
      buttonRightTl?.play();
    }
  };

  isInitialized = true;
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
