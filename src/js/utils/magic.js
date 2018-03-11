/* eslint-disable no-proto */

import uniqueId from 'cmnjs/uniqueId';

export default class Magic {
  constructor() {
    this.uid = uniqueId();
    this.timeStamp = Date.now();
    this.home = 'http://tomekf.pl/';
    this.author = 'Tomasz Fijoł';
  }
}
