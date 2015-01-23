var ts = require('gulp-typescript');
var eventStream = require('event-stream');
var gulp = require("gulp");

var tsProject = ts.createProject({
    declarationFiles: true,
    noExternalResolve: true
});

gulp.task('scripts', function() {
    var tsResult = gulp.src('src/*.ts')
        .pipe(ts(tsProject));

    return eventStream.merge( // Merge the two output streams, so this task is finished when the IO of both operations are done.
        tsResult.dts.pipe(gulp.dest('build/definitions')),
        tsResult.js.pipe(gulp.dest('build/js'))
    );
});
gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/*.ts', ['scripts']);
});