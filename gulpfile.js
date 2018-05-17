const gulp = require('gulp');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');

const cssnano = require('cssnano');
const easyimport = require('postcss-easy-import');

const nodemonServerInit = function () {
    livereload.listen(1234);
};

gulp.task('sass', function() {
    const processors = [
        easyimport,
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];
        
    gulp
        .src('assets/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('assets/build/'))
        .pipe(livereload());
});

gulp.task('build', ['sass'], function (/* cb */) {
    return nodemonServerInit();
});
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
});

gulp.task('default', ['build'],  function() {
    gulp.start('watch');
});