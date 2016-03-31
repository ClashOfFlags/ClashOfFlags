require('dotenv').config();

/********************************************************
 *  Options
 *******************************************************/

var options = {
    'folders': {
        'app_package': 'public',
        'source': '/sources',
        'dest': '/distribution'
    }
};

/********************************************************
 *  Gulp
 *******************************************************/
var gulp = require('gulp');
var gutil = require('gulp-util');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sassdoc = require('sassdoc');
var esdoc = require("gulp-esdoc");
var save = require('gulp-save');
var browserSync = require('browser-sync').create();

var folder_source = options.folders.app_package + options.folders.source;
var folder_dest = options.folders.app_package + options.folders.dest;

/********************************************************
 *  Tasks
 *******************************************************/

gulp.task('default', ['css', 'js'], function () {
});

gulp.task('watch', function () {
    browserSync.init({
        ui: false,
        ghostMode: false,
        proxy: {
            target: 'localhost:' + process.env.PORT,
            ws: true
        }
    });

    gulp.watch(folder_source + '/scss/**/*.scss', ['css']);
    gulp.watch(folder_source + '/javascript/**/*.js', ['js']);
    gulp.watch(folder_dest + '/**/*').on('change', browserSync.reload);
    //buildScript('index.js', true);
});

gulp.task('js', function () {
    return buildScript('index.js', false);
});



gulp.task('css', function () {
    return buildCss('app.scss');
});

/********************************************************
 *  Documentations
 *******************************************************/

gulp.task('sassdoc', function () {
    return gulp
        .src(folder_source + '/scss/app.scss')
        .pipe(sassdoc({
            'dest': './Web/doc/sass'
        }))
        .resume();
});

gulp.task('jsdoc', function () {
    return gulp.src(folder_source + '/javascript')
        .pipe(esdoc({destination: "./Web/doc/js"}));
});



/********************************************************
 *  Asset build functions
 *******************************************************/

function buildCss(file) {
    var sassOptions = {
        outputStyle: 'expanded'
    };

    var job = gulp.src(folder_source + '/scss/' + file)
        .pipe(sass(sassOptions))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(sass().on('error', sass.logError))

        .pipe(save('before-minify'))
        .pipe(cssnano())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest(folder_dest + '/css/'))
        .pipe(save.restore('before-minify'))

        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(folder_dest + '/css'))
        .pipe(notify('SASS completed.'));

    return job;
}

function buildScript(file, watch) {
    var props = {
        entries: [folder_source + '/javascript/' + file],
        debug: true,
        transform: [[babelify, {presets: ["es2015"]}]]
    };

    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', handleErrors)
            .pipe(source(file))
            .pipe(buffer())

            .pipe(save('before-uglify'))
            // .pipe(uglify())
            .pipe(rename('app.min.js'))
            .pipe(gulp.dest(folder_dest + '/javascript/'))
            .pipe(save.restore('before-uglify'))

            .pipe(rename('app.js'))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(folder_dest + '/javascript/'))
            .pipe(notify('Javascript completed.'));
    }

    bundler.on('update', function () {
        rebundle();
        gutil.log('Rebundle javascript...');
    });

    return rebundle();
}


function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}
