var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("JS - Concat",function(){
  return gulp.src([
                    './js/modulos/**/*.js',
                    './js/views/canvas.js'
                  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./js/public/'));
});
