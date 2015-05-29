var gulp = require('gulp');
var mocha = require('gulp-mocha');
var path = require('path');

gulp.task('test', function () {
  return gulp.src('test/**/*Test*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe(mocha({
        require: [path.resolve('test/config/ChaiConfig.js'), path.resolve('test/config/SinonConfig.js')]
      }));
});