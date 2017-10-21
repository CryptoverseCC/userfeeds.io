import scroll from '../scripts/scroll';
import navOnMobile from '../scripts/navOnMobile';

import '../styles/userfeeds.scss';

if (document.readyState === 'complete') {
  init();
} else {
  window.addEventListener('load', init);
}

function init() {
  scroll();
  navOnMobile();
}
