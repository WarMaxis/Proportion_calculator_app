// moduł gdzie ogarniamy ujowe sprawy

import debounce from 'cmnjs/function/debounce';
import throttle from 'cmnjs/function/throttle';

import Magic from '../utils/magic';
import Emitter from '../utils/eventEmitter';
import config from '../utils/config';
import widthAndBreakpoint from '../utils/widthAndBreakpoint';
import scrollTop from '../utils/scrollTop';

class Ui extends Magic {

  constructor() {
    super();
    this.initEmitter();
    this.setEvents();
  }

  eventResize(event) {
    // emisja eventu resize
    console.log('emit resize');
    this.emitter.emit('resize', event);
  }

  eventScroll(event) {
    // emisja eventu scroll
    console.log('emit scroll');
    this.emitter.emit('scroll', event);
  }

  eventHashChange(event) {
    // emisja eventu hashchange
    console.log('emit hashchange');
    this.emitter.emit('hashchange', event);
  }

  eventPopState(event) {
    // emisja eventu hashchange
    console.log('emit popstate');
    this.emitter.emit('popstate', event);
  }

  setEvents() {
    global
      .addEventListener('resize', debounce(this.eventResize.bind(this), config.resizeDebounceDuration));
    global
      .addEventListener('scroll', throttle(this.eventScroll.bind(this), config.scrollThrottleDuration, {
        leading: true
      }));
    global.addEventListener('hashchange', this.eventHashChange.bind(this));
    global.addEventListener('popstate', this.eventPopState.bind(this));
  }

  initEmitter() {
    const emitter = new Emitter();

    this.emitter = emitter;

    // default config
    emitter.on('resize', widthAndBreakpoint);
    emitter.on('scroll', scrollTop);
    emitter.on('hashchange', event => {
      console.log('hashchange', event);
    });
    emitter.on('popstate', event => {
      console.log('popstate', event);
    });

    emitter.emit('resize');
    emitter.emit('scroll');
    // emitter.emit('hashchange'); // na start nie trzeba
    // history.pushState({page: 1}, "title 1", "?page=1"); // test
  }

}

const ui = new Ui();

export default ui;
