import config from './config';

// shortcut
const breakpoints = config.breakpoints;

export function getWindowWidth() {
  return global.innerWidth;
}

// config.windowWidth.current => config.breakpoints.list.sm.size
// or
// config.breakpoints.current === 'sm'
export default function widthAndBreakpoint() {
  console.log('widthAndBreakpoint');

  let currentBreak;
  const currentWindowWidth = getWindowWidth();

  // set in config for future use
  config.windowWidth.previous = config.windowWidth.current;
  config.windowWidth.current = currentWindowWidth;
  if (config.windowWidth.previous === null) config.windowWidth.previous = currentWindowWidth; // init
  config.windowWidth.equal = config.windowWidth.previous === config.windowWidth.current;

  for (const i of Object.keys(breakpoints.list)) {
    if (currentWindowWidth < breakpoints.list[i].size) {
      break;
    } else {
      currentBreak = i;
    }
  }

  breakpoints.previous = breakpoints.current;
  breakpoints.current = currentBreak;
  if (breakpoints.previous === null) breakpoints.previous = currentBreak; // init
  breakpoints.equal = breakpoints.previous === breakpoints.current;
}
