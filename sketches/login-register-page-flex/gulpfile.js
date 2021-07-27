const gulp = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./tasks');

exports.hello = tasks.hello;
exports.style = tasks.style;
exports.ttf = tasks.ttf;
exports.pug2html = tasks.pug2html;
exports.bs_html = tasks.bs_html;
exports.watching = tasks.watching;