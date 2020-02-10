"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = exports.checkIsMd = exports.fileReturn = exports.checkIsFile = exports.checkIfRouteIsAbosulte = void 0;

const path = require('path'); // para llamar a métodos de path


const fs = require('fs'); // para llamar los métodos de fs
// Verifica si la ruta ingresada es absoluta.
// export const checkIfRouteIsAbosulte = (route) => path.isAbsolute(route);
// export const transformRelativePath = (route) => path.resolve(route);


const checkIfRouteIsAbosulte = route => {
  if (!path.isAbsolute(route)) {
    const pathAbs = path.resolve(route); // si es relativa resuelve que sea absoluta

    return pathAbs;
  }

  return route;
};

exports.checkIfRouteIsAbosulte = checkIfRouteIsAbosulte;

const checkIsFile = route => fs.statSync(route).isFile();

exports.checkIsFile = checkIsFile;

const fileReturn = route => {
  let arrayOfPathFile = [];

  if (checkIsFile(route)) {
    arrayOfPathFile.push(route);
  } else {
    const files = fs.readdirSync(route); // console.log('verifica los directorios', files); // lee el directorio de la ruta

    files.forEach(file => {
      const newRoute = path.join(route, file); // console.log('que me da:', newRoute);

      arrayOfPathFile = arrayOfPathFile.concat(fileReturn(newRoute));
    });
  }

  return arrayOfPathFile;
};

exports.fileReturn = fileReturn;

const checkIsMd = arrayFiles => {
  return arrayFiles.filter(element => path.extname(element) === '.md');
}; // esto para considerar en la programación


exports.checkIsMd = checkIsMd;
const prueba = ['/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/a/algo.md', '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/a/otro.js', '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md', 'cualquier.txt', 'otro.md'];
console.log('array md', checkIsMd(prueba));

const readFile = route => fs.readFileSync(route, 'utf8');

exports.readFile = readFile;
const mdFile = readFile('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md');
const patron1 = /(^|[^!])\[(.*)\]\((.*)\)/g;
const patron2 = /\((.*)\)/g;
const patron3 = /\[((.*))\]/g;
const arrayResultMatch = mdFile.match(patron1);
console.log(arrayResultMatch);

if (arrayResultMatch !== null) {
  arrayResultMatch.forEach(element => {
    const href = element.match(patron2);
    const name = element.match(patron3); // console.log('file', path.resolve(element));

    console.log('ruta');
    console.log('las referencias', href);
    console.log('los nombres', name);
  });
}