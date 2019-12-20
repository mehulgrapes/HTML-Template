var gulp = require("gulp");

// Requires the gulp-sass plugin
var autoprefixer = require("gulp-autoprefixer"),
  sass = require("gulp-sass"),
  gutil = require("gulp-util"),
  bs = require("browser-sync").create(),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  sourcemaps = require("gulp-sourcemaps");

gulp.task("bs", function() {
  bs.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("scss/**/*.scss", gulp.series("sass"));
  gulp.watch("./**/*.html").on("change", bs.reload);
  gulp.watch("./**/*.js").on("change", bs.reload);
});

gulp.task("fonts", function() {
  return gulp
    .src("node_modules/@fortawesome/fontawesome-free/webfonts/*")
    .pipe(gulp.dest("fonts"));
});

gulp.task("sass", function() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compact" }))
    .on("error", gutil.log.bind(gutil, "Sass Error"))
    .pipe(
      autoprefixer({
        browsers: ["last 4 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("css"))
    .pipe(bs.stream());
});

gulp.task("scripts", function() {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.bundle.js",
      "node_modules/swiper/dist/js/swiper.js",
      "node_modules/wow.js/dist/WOW.js",
      "node_modules/isotope-layout/dist/isotope.pkgd.min.js",
      "node_modules/imagesloaded/imagesloaded.pkgd.js",
      "node_modules/jquery-countto/jquery.countTo.js",
      "node_modules/jquery-appear-original/index.js"
    ])
    .pipe(concat("plugins.js"))
    .pipe(uglify())
    .pipe(gulp.dest("js/"));
});

gulp.task("default", gulp.series("scripts", "sass", "fonts", "bs"));
