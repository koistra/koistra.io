var gulp = require('gulp'), // Подключаем Gulp
  sass = require('gulp-sass'), //Подключаем Sass пакет,
  browserSync = require('browser-sync'), // Подключаем Browser Sync
  autoprefixer = require('gulp-autoprefixer'); // Подключаем библиотеку для автоматического добавления префиксов


//компиляция scss в css

gulp.task('sass', function() {
  return gulp.src('app/sass/main.scss')

    .pipe(sass({

    }))

    .pipe(autoprefixer(['last 15 versions'], {
      cascade: true
    })) // Создаем префиксы

    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


//автоматическая перезагрузка браузера после изменения файлов

gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: 'app' // Директория для сервера - app
    },
    notify: false // Отключаем уведомления
  });
});


//  Слежение за изменениями файлов
gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
  gulp.watch('app/**/*.js', browserSync.reload); // Наблюдение за js файлами в корне проекта
});

gulp.task('default', ['watch']);