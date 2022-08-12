const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


function css( done ) {
    // Compilar SASS
    // Pasos: 1. Localizar archivos SASS, 2. Compilar archivos SASS, 3. Guardar archivos SCSS

    src('src/scss/app.scss') // identifica el archivo a compilar
        .pipe(sass()) // compila el archivo resultado del paso anterior
        // .pipe(sass({ outputStyle: 'compressed' }))
        // .pipe(sass({ outputStyle: 'expanded' }))
        .pipe( postcss( [ autoprefixer() ] )) // create compatible version for different browser, whose list has to be specified in the package.json
        .pipe(dest('build/css')); // crea una nueva carpeta en la que ubica el archivo resltante del paso anterior

    done();
}

function dev() {
    // look for changes on the scss file and call the css function if any
    watch('src/scss/app.scss', css);
}

exports.css = css;
exports.dev = dev;