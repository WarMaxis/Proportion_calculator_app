/* eslint-disable */
import 'modernizr';
/* eslint-enable */
import 'whatwg-fetch';

import picFill from '../utils/picturefill';

export default function init() {
  global.ldr = global.ldr || {};

  console.log(`${ process.env.NODE_ENV } version`);

  picFill();
}
