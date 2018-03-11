const picFill = () => {
  const Modernizr = global.Modernizr;

  if (!Modernizr || !Modernizr.srcset || !Modernizr.picture) {
    require.ensure([],
      /* eslint-disable */
      require => require('picturefill'),
      /* eslint-enable */
      'picturefill')
      .then(() => {
        if (global.picturefill) global.picturefill();
      })
      .catch(err => console.log(err));
  }
};

export default picFill;
