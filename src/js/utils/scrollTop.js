import config from './config';

export function getWindowScroll() {
  return global.pageYOffset;
}

export default function scrollTop() {
  console.log('scrollTop');

  // set in config for future use
  config.scrollTop = getWindowScroll();
}
