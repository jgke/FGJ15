var ts = require('gulp-typescript');
var eventStream = require('event-stream');
var gulp = require("gulp");

var tsProject = ts.createProject({
    declarationFiles: false,
    noExternalResolve: false
});

gulp.task('scripts', function() {
    var tsResult = gulp.src('src/*.ts').pipe(ts(tsProject));
    var staticResult = gulp.src("static/*").pipe(gulp.dest("build/"));
    var vendorPhaser = gulp.src("bower_components/phaser/build/phaser.min.js").pipe(gulp.dest("build/vendor"));

    return eventStream.merge( // Merge the two output streams, so this task is finished when the IO of both operations are done.
        staticResult,
        vendorPhaser,
        tsResult.dts.pipe(gulp.dest('build/definitions')),
        tsResult.js.pipe(gulp.dest('build/js'))
    );
});
gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/*.ts', ['scripts']);
});