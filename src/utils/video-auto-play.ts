import type { OTHTMLMediaElement } from '$models/ot-html-media-element';

export const autoPlayVideos = () => {
  $('body').on('click touchstart', function () {
    const videoElements = document.querySelectorAll<OTHTMLMediaElement>('video');

    if (!(videoElements && videoElements.length > 0)) return;

    videoElements.forEach((videoElement) => {
      if (videoElement.playing) {
        // video is already playing so do nothing
      } else {
        // video is not playing
        // so play video now
        videoElement.play();
      }
    });
  });
};
