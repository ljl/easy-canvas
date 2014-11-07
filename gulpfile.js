var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', ['compile', 'install']);

gulp.task('compile', function() {
    gulp.src(['src/CanvasObject.js','src/FillObject.js','src/StrokeObject.js','./src/*.js'])
        .pipe(concat('easy-canvas.js'))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('install', function() {
   gulp.src('./dist/easy-canvas.js')
       .pipe(gulp.dest('../practice/js/lib/'))
});