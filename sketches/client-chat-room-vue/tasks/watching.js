const {	watch, parallel, series } = require('gulp');
const bs = require('browser-sync');

module.exports = function watching() {
	bs.init({
		server: {
			baseDir: 'build/',
			host: '192.168.140.68',
			index: 'main.html',
		},
		browser: 'firefox',
		logPrefix: 'BS-HTML:',
		logLevel: 'info',
		logConnections: true,
		logFileChanges: true,
		open: true
	})

	watch('src/**/*.pug', parallel('pug2html'));
	watch('sass/**/*.sass', parallel('style'));
	watch('sass/**/*.sass', parallel('clean_css'));
	watch('build/js/*.js').on('change', bs.reload);
	watch('build/**/*.html').on('change', bs.reload);
	watch('build/**/*.css').on('change', bs.reload);
}
