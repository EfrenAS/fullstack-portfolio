const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const terser = require("gulp-terser-js");
const rename = require("gulp-rename");
const clean = require("gulp-clean");

// Proccess Image
const cache = require("gulp-cache");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
const imagemin = require("gulp-imagemin");

function imageMin(done) {
  const options = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin()))
    .pipe(dest("./public/build/img"));

  done();
}

function webpVersion(done) {
  const options = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}").pipe(webp(options)).pipe(dest("./public/build/img"));

  done();
}

function avifVersion(done) {
  const options = {
    optimizationLevel: 3,
  };

  src("src/img/**/*.{png,jpg}").pipe(avif(options)).pipe(dest("./public/build/img"));

  done();
}

const paths = {
  scss: "src/scss/**/*.scss",
  js: "src/js/**/*.js",
};

function css() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./public/build/css"));
}

function javascript() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat("bundle.js"))
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./public/build/js"));
}

function watchFiles() {
  watch(paths.scss, css);
  watch(paths.js, javascript);
}

exports.css = css;
exports.imageMin = imageMin;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.watchFiles = watchFiles;
exports.default = parallel(
  css,
  imageMin,
  webpVersion,
  avifVersion,
  javascript,
  watchFiles
);
