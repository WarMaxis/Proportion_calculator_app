/* global DocumentTouch */

export default function hasTouch() {
  return ('ontouchstart' in global || global.DocumentTouch && global.document instanceof DocumentTouch ||
    global.navigator.maxTouchPoints || global.navigator.msMaxTouchPoints) &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(global.navigator.userAgent);
}
