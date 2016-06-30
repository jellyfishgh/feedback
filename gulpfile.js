const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');

gulp.task('default', () => {
    return browserify({
        entries: './public/js/src/app.js'
    }).transform(babelify, {
        presets: ['es2015']
    }).bundle().pipe(uglify()).pipe(gulp.dest('./public/js/dist'));
});