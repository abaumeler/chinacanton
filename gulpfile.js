var gulp = require('gulp');
var browserSync = require('browser-sync').create("server1");
var sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

gulp.task('serve', function(done) {
    browserSync.init({
        server: "./src"  
    });

    gulp.watch('node_modules/bootstrap/scss/bootstrap.scss', gulp.series('sass'));
    gulp.watch('src/scss/*.scss', gulp.series('sass'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
    done();
});

// default is the task that is executed with "gulp"
gulp.task('default', gulp.series('sass', 'serve', function (done) {
    done();
}));
