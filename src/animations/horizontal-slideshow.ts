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
  const buttonRight = document.querySelector<HTMLElement>(
    `[slideshow-button-right=${instanceName}]`
  );
  const buttonLeft = document.querySelector<HTMLElement>(`[slideshow-button-left=${instanceName}]`);
  if (!(buttonRight && buttonLeft)) return;
  const listWidth = list.scrollWidth;
  const listViewportWidth = list.offsetWidth;
  const itemWidth = listItem.offsetWidth;
  const itemsInView = Math.max(listViewportWidth / (itemWidth + gap));
  let maxLeftScroll = Math.max(listWidth / (itemWidth + gap)) - itemsInView;
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

  buttonRightTl?.to(buttonLeft, { opacity: 0, cursor: 'auto' });
  buttonLeftTl?.to(buttonRight, { opacity: 0, cursor: 'auto' });

  buttonRight.onclick = () => {
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

  buttonLeft.onclick = () => {
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
