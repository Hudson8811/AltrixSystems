module.exports = function() {
    $.gulp.task('serve', function() {
        $.browserSync.init({
            server: './assets',
            directory: true
        });
    });
};