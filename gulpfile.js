var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoPrefixer = require('gulp-autoprefixer');
var cssComb = require('gulp-csscomb');
var cleanCss = require('gulp-clean-css');
var cmq = require('gulp-merge-media-queries');
var notify = require('gulp-notify');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var purify = require('gulp-purifycss');

gulp.task('styles', function(){
  return gulp.src('src/styles/theme1/main.scss')
    .pipe(plumber({
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(cssComb())
    .pipe(cmq({ log:true }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(cleanCss({
        inline: ['none']
    }))
    .pipe(gulp.dest('dist/styles/theme1'))
    .pipe(notify('styles task finished'))
});

gulp.task('libs',function(){
    return gulp.src(['node_modules/jquery-migrate/dist/jquery-migrate.min.js',
              'node_modules/popper.js/dist/umd/popper.min.js',
              'node_modules/bootstrap/dist/js/bootstrap.min.js',
              //'node_modules/flickity/dist/flickity.pkgd.min.js',
              'node_modules/bootstrap-select/dist/js/bootstrap-select.min.js'])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('dist/scripts'))
          .pipe(notify('libs task finished'))
});

gulp.task('scripts',function(){
    return gulp.src(['node_modules/jquery/dist/jquery.js',
            'src/scripts/main.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
          .pipe(notify('scripts task finished'))
});

// gulp.task('images',function(){
//     return gulp.src(['src/images/**/*'])

//         .pipe(gulp.dest('dist/images'))
//         .pipe(notify('images task finished'))
// });

gulp.task('build', function(){
    // gulp.start('styles', 'libs', 'scripts', 'images');
    gulp.start('styles', 'libs', 'scripts');
});

gulp.task('default', function(){
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/main.js', ['scripts']);
    // gulp.watch('src/images/**/*', ['images']);
});

// gulp.task('default', function(){
//     gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
//     gulp.watch('src/scripts/main.js', gulp.series('scripts'));
//     gulp.watch('src/images/**/*', gulp.series('images'));
// });

//gulp.task('build', gulp.parallel('styles', 'libs', 'scripts', 'images'));
