import {
  BackgroundColorAnimation,
  NavigationTransitionAnimation,
  PhoneNavigationAnimation,
  CharsSlideUpScrollAnimation,
  WordsSlideUpScrollAnimation,
  FadeInScrollAnimation,
  Cursor,
} from '$animations';
import { matchPhoneAll, matchOrientationLandscape } from '$utils';

export class Page {
  protected readonly _phoneNavigationAnimation: PhoneNavigationAnimation;
  protected readonly _backgroundColorAnimation: BackgroundColorAnimation;
  protected readonly _navigationTransitionAnimation: NavigationTransitionAnimation;
  protected readonly _cursorAnimation: Cursor;
  protected readonly _charsSlideUpScrollAnimation?: CharsSlideUpScrollAnimation;
  protected readonly _wordsSlideUpScrollAnimation?: CharsSlideUpScrollAnimation;
  protected readonly _fadeInScrollAnimation?: FadeInScrollAnimation;

  protected _isLoaded = false;

  /**
   * Create a new default page.
   */
  constructor() {
    // Register core animations
    this._phoneNavigationAnimation = new PhoneNavigationAnimation();
    this._backgroundColorAnimation = new BackgroundColorAnimation();
    this._cursorAnimation = new Cursor();

    // Only register these animations when the device has more than 2 CPU cores
    if (navigator.hardwareConcurrency > 2) {
      this._charsSlideUpScrollAnimation = new CharsSlideUpScrollAnimation();
      this._wordsSlideUpScrollAnimation = new WordsSlideUpScrollAnimation();
      this._fadeInScrollAnimation = new FadeInScrollAnimation();
    }

    // Initialize page transition last to ensure everything is loaded properly
    this._navigationTransitionAnimation = new NavigationTransitionAnimation();

    // Reload page when rescaled to phone
    matchPhoneAll.addEventListener('change', () => {
      window.location.reload();
    });
    // Reload on orientation change
    matchOrientationLandscape.addEventListener('change', () => {
      window.location.reload();
    });

    // Only call the finishLoading function from here when this class hasn't been extended
    // otherwise the function will not be called, now the class that extends this class
    // has the responsibility to call the finishLoading function
    if (this.constructor === Page) {
      // The Page class is not extended so call finish loading
      this.finishLoading();
    }
  }

  /**
   * Start the page transition animation. Meant for use after initial page load.
   *
   * If the page has already finished loading once, the animation will not replay.
   */
  protected finishLoading() {
    if (!this._isLoaded) this._navigationTransitionAnimation.playPageTransition('out');
    this._isLoaded = true;
  }
}
