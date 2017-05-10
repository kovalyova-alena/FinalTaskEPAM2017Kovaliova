var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    prettify = require('gulp-html-prettify'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('image', function () {
    return gulp.src('./img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./builds/img/'));
});

gulp.task('js', function () {
    return gulp.src(['./js/App.js', './js/pages/*.js'])
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./builds/'));
});


gulp.task('css', function () {
    return gulp.src(['./css/fonts.css', './css/style.css'])
        .pipe(concatCss("all.css"))
        .pipe(autoprefixer([
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ]))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./builds/'));
});


gulp.task('watch', function() {
    gulp.watch("./css/*.css", ['css']);
    gulp.watch(["./js/*.js","./js/pages/*.js"], ['js']);
});
