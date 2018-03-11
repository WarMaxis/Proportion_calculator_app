// import React from 'react';
// import ReactDOM from 'react-dom';

import 'babel-polyfill';
import './vendor/customEventPolyfill';

import init from './base/init';
import './base/ui';
import Magic from './utils/magic';
import common from './base/common';
import split from './base/split';

class App extends Magic {
  constructor() {
    super();
    init();
    common();
    split();
  }
}

new App();
