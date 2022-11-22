/* eslint-disable @typescript-eslint/no-explicit-any */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getTextColor } from '../utils/dynamic-text-color';

gsap.registerPlugin(ScrollTrigger);

export const registerBackgroundColor = () => {
  (gsap.utils.toArray('[animate-background]') as Array<Element>).forEach((element) => {
    ScrollTrigger.create({
      id: 'animate-background',
      trigger: element,
      start: 'top 20%',
      end: 'bottom 80%',
      markers: false,
      onEnter: setColor,
      onLeave: resetColor,
      onEnterBack: setColor,
      onLeaveBack: resetColor,
      invalidateOnRefresh: true,
    });
  });
};

function setColor(self: any) {
  self.oldBodyBackground = gsap.getProperty('body', 'backgroundColor');
  const backgroundColor = self.trigger?.getAttribute('animate-background');
  const textColor = self.trigger?.getAttribute('text-color') ?? getTextColor(backgroundColor);
  gsap.set('body', {
    backgroundColor: backgroundColor,
  });
  gsap.set('body', {
    color: textColor,
  });
}

function resetColor(self: any) {
  const backgroundColor = self.oldBodyBackground;
  const textColor = getTextColor(backgroundColor);
  gsap.set('body', {
    backgroundColor: backgroundColor,
  });
  gsap.set('body', {
    color: textColor,
  });
}
