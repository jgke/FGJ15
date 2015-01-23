var ts = require('gulp-typescript');
var eventStream = require('event-stream');
var gulp = require("gulp");

var tsProject = ts.createProject({
    declarationFiles: false,
    noExternalResolve: false,
    module: "amd"
});

gulp.task('static', function() {
    return eventStream.merge(
        gulp.src("static/*").pipe(gulp.dest("build/"))
    );
});

gulp.task('assets', function() {
    return eventStream.merge(
        gulp.src("assets/*").pipe(gulp.dest("build/assets/"))
    );
});

gulp.task('vendor', function() {
    return eventStream.merge(
        gulp.src("bower_components/phaser/build/phaser.min.js").pipe(gulp.dest("build/vendor")),
        gulp.src("bower_components/requirejs/require.js").pipe(gulp.dest("build/vendor"))
    );
});

gulp.task('scripts', function() {
    var tsResult = gulp.src('src/*.ts').pipe(ts(tsProject));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest('build/definitions')),
        tsResult.js.pipe(gulp.dest('build/js'))
    );
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/*.ts', ['scripts', 'vendor']);
    gulp.watch('static/*', ['static']);
    gulp.watch('assets/*', ['assets']);
});

gulp.task('default', ['static', 'scripts', 'assets', 'vendor', 'watch']);