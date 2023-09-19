import { HeroHomeAnimation, WebCtaAnimation, TextLoopAnimation } from '$animations';
import { ProjectsHorizontalScroll } from '$interactions';

import { Page } from './page';

export class HomePage extends Page {
  private _heroHomeAnimation: HeroHomeAnimation;
  private _galleryScrollAnimation: ProjectsHorizontalScroll;
  private _webCtaAnimation: WebCtaAnimation;
  private _textLoopAnimation: TextLoopAnimation;

  /**
   * Create a new Home page.
   */
  constructor() {
    super();

    this._heroHomeAnimation = new HeroHomeAnimation();
    this._galleryScrollAnimation = new ProjectsHorizontalScroll();
    this._webCtaAnimation = new WebCtaAnimation();
    this._textLoopAnimation = new TextLoopAnimation();

    this.finishLoading();
  }
}
