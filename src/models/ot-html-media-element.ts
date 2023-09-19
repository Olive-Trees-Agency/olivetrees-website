// Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
//   get: function () {
//     return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
//   },
// });

/**
 * Custom Olive Trees `HTMLMediaElement`
 */
export class OTHTMLMediaElement extends HTMLMediaElement {
  /** Returns true when the media element is currently playing */
  public get playing(): boolean {
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
}
