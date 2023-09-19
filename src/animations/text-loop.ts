import { gsap } from 'gsap';

import { debounce } from '$utils';

export class TextLoopAnimation {
  private ELEMENTS_SELECTOR = '[text-loop]';

  private _elements: NodeListOf<HTMLElement>;
  public get elements(): NodeListOf<HTMLElement> {
    return this._elements;
  }

  private _previousWindowWidth: number;

  /**
   * Apply a text loop animation to all elements with the `text-loop` HTML attribute.
   *
   * This animation requires the `[text-loop]` element to have `display: flex;` with a `column-gap`set.
   * Reason being that the original text element is duplicated inside the `[text-loop]` element and a gap needs to be defined between the original text element and the cloned text element.
   * It is also required that the `[text-loop]` element is the wrapper to a text element.
   *
   * ---
   *
   * HTML structure needed for the animation:
   * ```html
   * <style>
   *  .text-wrapper {
   *    display: flex;
   *    column-gap: 0.5rem;
   *    overflow: hidden;
   *  }
   *
   *  .text {
   *    text-wrap: nowrap;
   *  }
   * </style>
   * <div text-loop class="text-wrapper">
   *  <span class="text">Looping text</span>
   * </div>
   * ```
   */
  constructor() {
    this._elements = document.querySelectorAll(this.ELEMENTS_SELECTOR);
    this._previousWindowWidth = window.innerWidth;

    this._elements.forEach((element) => {
      const text = element.firstChild;
      if (!text) return;

      const textClone = text.cloneNode(true);
      element.append(textClone);

      let tween = this.startLoop(element);

      // Restart the animation when the window width has been resized because this changes the text size
      window.addEventListener(
        'resize',
        debounce(() => {
          if (window.innerWidth !== this._previousWindowWidth) {
            tween.progress(0).kill();
            tween = this.startLoop(element);
            this._previousWindowWidth = window.innerWidth;
          }
        }, 500)
      );
    });
  }

  private startLoop(element: HTMLElement) {
    return gsap.fromTo(
      element.children,
      { x: 0 },
      { x: this.calculateTranslationDistance(element), duration: 20, repeat: -1, ease: 'none' }
    );
  }

  private calculateTranslationDistance(element: HTMLElement) {
    const width = parseInt(
      getComputedStyle(element.firstChild as HTMLElement).getPropertyValue('width'),
      10
    );
    const gap = parseInt(getComputedStyle(element).getPropertyValue('column-gap'), 10);
    return -1 * (width + gap);
  }
}
