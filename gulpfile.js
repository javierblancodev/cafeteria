const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');

// Convierte SASS a CSS
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


// Compila las imagenes
function imagenes( done ) {
    src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') );

    done();
}

function dev() {
    // look for changes on the scss file and call the css function if any
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css; // se llama desde la terminal con el comando gulp + nombre de la tarea exportada, en este caso gulp css
exports.dev = dev;
exports.imagenes = imagenes;
// exports.default = css; // la palabra clave default significa que esta tarea sera ejecutada por defecto desde la terminalsi no se pasa argumento
exports.default = series(imagenes, css, dev); // podemos importar la funcion series desde gulp para ejecutar multiples tareas una tras otra
exports.taresEnParalelo = parallel(css, dev); // podemos importar la funcion parallel desde gulp para ejecutar multiples tareas a la vez