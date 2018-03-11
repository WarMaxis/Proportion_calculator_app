'use strict';

const config = require('./gulpConfig');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
// const twig = require('gulp-twig');
const util = require('gulp-util');
// const gif = require('gulp-if');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
const webpack = require('webpack');
const del = require('del');
// const mkdirp = require('mkdirp');
const size = require('gulp-size');
// const insert = require('gulp-insert');
// const fs = require('fs');
// const path = require('path');

const chalk = util.colors;
const dev = config.dev;

let webpackConfigDev;
let webPackDevCompiler;

function getBuildDate() {
  const now = new Date();
  const buildConfig = {};

  buildConfig.buildDateTimeStamp = now.getTime();
  buildConfig.buildDate = util.date(now, 'yyyy/mm/dd');
  buildConfig.buildDateIso = util.date(now, 'isoDate');
  buildConfig.buildTimeIso = util.date(now, 'isoTime');

  return buildConfig;
}

function getFormattedBuildDate(buildConfig, addDots) {
  const pre = addDots ? ' * ' : '';

  return `${ pre }Copyright Tomek Fijoł http://tomekf.pl/
${ pre }${ buildConfig.buildDateIso } ${ buildConfig.buildTimeIso } | ${ buildConfig.buildDateTimeStamp }`;
}

function setWebPackPlugins() {
  const plugs = [];

  const buildDate = getBuildDate();
  const banner = getFormattedBuildDate(buildDate);

  //plugs.push(new webpack.optimize.OccurenceOrderPlugin());

  // pass process.env.NODE_ENV to build
  plugs.push(new webpack.EnvironmentPlugin([
    'NODE_ENV'
  ]));

  // dodatkowe zmienne
  // plugs.push(new webpack.DefinePlugin({
  //   // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  //   webpackPOIAJAXDATATYPE: JSON.stringify(!dev ? 'script' : 'json')
  // }));

  // nagłówek do plików
  plugs.push(new webpack.BannerPlugin(banner));

  if (!dev) {
    plugs.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      warnings: true,
      compress: {
        // drop_console: true
      }
    }));
  }

  return plugs;
}

function logWebPack(stats) {
  util.log(chalk.green('[webpack-ldr]'));
  util.log(stats.toString({
    colors: 0,
    chunks: false,
    hash: true,
    warnings: dev
  }));
}

function webPackFunction(err, stats, callback) {
  if (err) throw new util.PluginError('webpack', err);
  logWebPack(stats);
  callback();
}

const webpackConfig = {
  devtool: dev ? 'eval-source-map' : 'source-map',
  entry: {
    main: config.src + 'js/main'
  },
  output: {
    //path: __dirname,
    path: config.distAbs + 'js',
    publicPath: '/js/', // cdn, http://...
    filename: '[name].js',
    chunkFilename: '[name].[hash].js'
    // chunkFilename: '[name].js'
  },
  resolve: {
    modules: ['node_modules', 'vendor'],
    alias: {
      modernizr: 'modernizr-custom.3.4.0',
      picturefill: 'picturefill.3.0.2'
    }
  },
  plugins: setWebPackPlugins(),
  module: {
    rules: [
      {
        test: /\.tpl$/,
        loader: 'underscore-loader',
        options: {
          engine: 'var _ = { escape: require(\'lodash/escape\') };\n',
          minifierOptions: { collapseInlineTagWhitespace: true }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|vendor)/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env',
              {
                modules: false
              }
            ]
          ],
          cacheDirectory: true
        }
      }
    ]
  }
};


if (dev) {
  webpackConfigDev = Object.create(webpackConfig);

  webpackConfigDev.watch = true;

  webPackDevCompiler = webpack(webpackConfigDev);

  gulp.task('webpack-ldr', callback => {
    webPackDevCompiler.run((err, stats) => {
      webPackFunction(err, stats, callback);
    });
  });
} else {
  gulp.task('webpack-ldr', callback => {
    webpack(webpackConfig, (err, stats) => {
      webPackFunction(err, stats, callback);
    });
  });
}

gulp.task('webpack-ldr-step-2', ['webpack-ldr'], () => {
  if (dev) return undefined;

  return gulp.src([
    config.dist + 'js/**/*.js'
  ])
    .pipe(size({ showFiles: true, showTotal: false }))
    .pipe(size({ showFiles: true, showTotal: false, gzip: true }));
});

gulp.task('sass-ldr', () => {
  const configSassLocal = {
    outputStyle: dev ? 'expanded' : 'compressed'
  };

  gulp.src([
    config.src + 'scss/**/*.scss'
  ])
    .pipe(sourcemaps.init())
    .pipe(sass(configSassLocal).on('error', sass.logError))
    .pipe(autoprefixer(config.configAutoPrefixer))
    .pipe(sourcemaps.write(dev ? '' : './css'))
    .pipe(gulp.dest(config.dist + 'css'));
});

gulp.task('copy-other-ldr', () => gulp
  .src(config.src + 'other/**/*.*')
  .pipe(gulp.dest(config.dist)));

gulp.task('copy-img-ldr', () => gulp
  .src(config.src + 'img/**/*.*')
  .pipe(gulp.dest(config.dist + 'img')));

gulp.task('clean', () => del([config.dist + '**'])
  .then(delPaths => {
    util.log(chalk.blue('Deleted files/folders:'));
    if (!delPaths.length) {
      util.log(chalk.gray('- nothing -'));
    }
    delPaths.forEach(e => {
      util.log(chalk.red('✖ ' + e.split('/').slice(-3).join('/')));
    });
  }).catch(err => {
    util.log(err);
  }));

gulp.task('build', [
  'sass-ldr',
  'webpack-ldr-step-2',
  'copy-other-ldr',
  'copy-img-ldr'
]);

gulp.task('watch-ldr', [
  'build'
], () => {
  gulp.watch([
    config.src + 'scss/**/*.scss'
  ], ['sass-ldr']);

  gulp.watch([
    config.src + 'js/**/*.js'
  ], ['webpack-ldr-step-2']);

  gulp.watch([
    config.src + 'other/**/*.*'
  ], ['copy-other-ldr']);

  gulp.watch([
    config.src + 'img/**/*.*'
  ], ['copy-img-ldr']);
});
