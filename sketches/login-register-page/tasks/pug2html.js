const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
// const jade = require('gulp-jade');
const pugLinter = require('gulp-pug-linter');
// const htmlValidator = require('gulp-w3c-html-validator');

module.exports = function pug2html() {
	return src('./src/**/*.pug')
      .pipe(plumber())
      .pipe(pugLinter({ reporter: 'default' }))
      .pipe(pug({ pretty: true }))
      // .pipe(jade({ pretty: true }))
      .pipe(dest('./build/'))
}