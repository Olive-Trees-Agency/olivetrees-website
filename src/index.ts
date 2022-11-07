import '$styles/index.css';

import { pageLoad } from './animations';

window.Webflow ||= [];

// On Webflow load
window.Webflow.push(() => {
  pageLoad();
});
