const gulp          = require('gulp');
const pump          = require('pump');
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const sourcemaps    = require('gulp-sourcemaps');

const sassConfig = {
	options: {
    includePaths: [
      'node_modules/foundation-sites/scss',
      'site/scss'
    ],
		outputStyle: 'compressed'
	}
};

gulp.task('sass', (cb) => {
  pump([
      gulp.src('./site/style.scss'),
      sourcemaps.init(),
      sass(sassConfig.options),
      autoprefixer({
        browsers: ['last 2 versions', 'ie 10']
      }),
      sourcemaps.write('.'),
      gulp.dest('./site')
    ], cb);
});

gulp.task('watch', () => {
  gulp.watch(['site/style.scss','site/scss/*'], ['sass']);
});

gulp.task('default', ['watch','sass']);
gulp.task('build', ['sass']);
