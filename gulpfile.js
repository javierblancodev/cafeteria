const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function css( done ) {
    // Compilar SASS
    // Pasos: 1. Localizar archivos SASS, 2. Compilar archivos SASS, 3. Guardar archivos SCSS

    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(dest('build/css'));

    done();
}

function dev() {
    // look for changes on the scss file and call the css function if any
    watch('src/scss/app.scss', css);
}

exports.css = css;
exports.dev = dev;