const gulp = require('gulp');
const replace = require('gulp-replace');
const args = require('yargs').argv;
const { createConfig } = require('@middlebury/gulp-config');

const THEME_DIR = process.env.THEME_DIR || args.themeDir || '';

const cmds = createConfig();

const replaceImagePaths = () => {
  const imagesDir = args.imagesDir || '/images/';
  return gulp
    .src('./dist/css/*.css')
    .pipe(replace('/images/', imagesDir))
    .pipe(gulp.dest('./dist/css'));
};

const deployDist = () => {
  if(!THEME_DIR) {
    return console.error('No `--themeDir` argument passed');
  }

  return gulp
    .src(['./dist/css/main.css', './dist/js/bundle.js', './dist/images/*'], {
      base: './dist'
    })
    .pipe(gulp.dest(THEME_DIR));
}

const deploy = gulp.series(replaceImagePaths, deployDist);

module.exports = {
  ...cmds,
  deploy
};

