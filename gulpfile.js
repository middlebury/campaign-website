const path = require('path');
const gulp = require('gulp');
const replace = require('gulp-replace');
const args = require('yargs').argv;
const { createConfig } = require('@middlebury/gulp-config');

const THEME_DIR = process.env.THEME_DIR || args.themeDir || '';

const { cwd } = process;

const DIST_DIR = 'dist';
const SOURCE_DIR = 'src';

const dist = (parts = '') => path.resolve(cwd(), DIST_DIR, parts);
const src = (parts) => path.resolve(cwd(), SOURCE_DIR, parts);


const copyDeps = () => {
  // NOTE: Chart.bundle.min.js includes Momentjs but so far we are not using time axis
  // http://www.chartjs.org/docs/latest/getting-started/installation.html#bundled-build
  return gulp
    .src('./node_modules/chart.js/dist/Chart.min.js')
    .pipe(gulp.dest('./dist/js'));
};

const options = {
  scripts: {
    src: src('js/index.ts'),
    watch: src('js/**/*'),
    dest: dist('js/bundle.js')
  },
  beforeBuild: [copyDeps],
  typescriptBuild: true
};

const cmds = createConfig(options);

const replaceImagePaths = () => {
  const imagesDir = args.imagesDir || '/img/';
  return gulp
    .src('./dist/css/*.css')
    .pipe(replace('/img/', imagesDir))
    .pipe(gulp.dest('./dist/css'));
};

const deployDist = () => {
  if(!THEME_DIR) {
    return console.error('No `--themeDir` argument passed');
  }

  return gulp
    .src(['./dist/css/main.css', './dist/js/bundle.js', './dist/img/*'], {
      base: './dist'
    })
    .pipe(gulp.dest(THEME_DIR));
}

const deploy = gulp.series(replaceImagePaths, deployDist);

module.exports = {
  ...cmds,
  replaceImagePaths,
  deploy
};

