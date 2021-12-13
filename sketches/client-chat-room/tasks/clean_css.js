const {	src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefixer = require('gulp-autoprefixer');
const bs = require('browser-sync');

module.exports = function clean_css() {
	return src('./sass/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefixer({
			overrideBrowserslist: ['last 8 versions'],
			browsers: [
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24',
				'Explorer >= 11',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6',
			],
		}))
		.pipe(dest('./build/css/'))
    .pipe(bs.stream())
}