'use strict';

const path = require('path');
const util = require('gulp-util');
const info = require('./package.json');

const chalk = util.colors;

function devCheck() {
  return process.env.NODE_ENV !== 'production' && !util.env.release;
}

const dev = devCheck();

process.env.NODE_ENV = dev ? 'development' : 'production';

// gulpfile info
util.log(chalk.cyan(info.name), chalk.blue(info.version));
util.log(chalk.cyan('NODE_ENV'), chalk.blue(process.env.NODE_ENV));

module.exports = {
  dev,
  devCheck,
  src: './src/',
  dist: './dist/',
  distAbs: path.join(__dirname, '/dist/'),

  configSass: {
    style: 'compressed',
    quiet: true
  },

  configAutoPrefixer: {
    browsers: ['last 2 versions'],
    cascade: false
  }
};
