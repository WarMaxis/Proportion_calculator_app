import hasTouch from './hasTouch';
import svgSupport from './svgSupport';
import getLang from './getLang';

// wszytskie null są ustawiane w init, po resize, po scroll

export default {

  // globalny lang, default pl
  lang: getLang(),

  touch: hasTouch(),

  svg: svgSupport(),

  // set as first thing after debounced resize
  windowWidth: {
    current: null,
    previous: null,
    equal: null
  },

  scrollTop: 0,

  // konfiguracja cookie w jednym miejscu
  cookie: {
    // do testów cookie
    test: {
      name: 'tf-test-',
      options: {
        path: '/'
      }
    }
  },

  // timeouts
  resizeDebounceDuration: 500,
  scrollThrottleDuration: 500,

  // breakpoint config
  // min-width
  breakpoints: {

    list: {

      xs: {
        name: 'xs',
        size: 0,
        sizeEm: 0
      },
      sm: {
        name: 'sm',
        size: 768,
        sizeEm: 48
      },
      md: {
        name: 'md',
        size: 1024,
        sizeEm: 64
      },
      lg: {
        name: 'lg',
        size: 1280,
        sizeEm: 80
      },
      xl: {
        name: 'xl',
        size: 1440,
        sizeEm: 90
      }

    },
    current: null,
    previous: null

  }

};
