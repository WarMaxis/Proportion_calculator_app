(function () {
  const noop = function () {
    // nothing here
  };
  const methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  let len = methods.length;

  if (!window.console) {
    window.console = window.console || {};
  }

  while (len--) {
    const method = methods[len];

    // Only stub undefined methods.
    if (!window.console[method]) {
      window.console[method] = noop;
    }
  }
}());
