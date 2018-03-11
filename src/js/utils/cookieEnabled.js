import uniqueId from 'cmnjs/uniqueId';
import jsCookie from 'js-cookie';

import config from './config';

const testCookieConfig = config.cookie.test;

function testCookie() {
  const name = testCookieConfig.name + uniqueId();

  jsCookie(name, 1, testCookieConfig.options);

  const cookieSet = document.cookie.indexOf(name) > -1;

  jsCookie.remove(name, testCookieConfig.options);
  return cookieSet;
}

export default function cookieEnabled() {
  console.log('cookie' in document, testCookie());
  return 'cookie' in document && testCookie();
}

