"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractLink = exports.readFile = exports.checkIsMd = exports.fileReturn = exports.checkIsFile = exports.validateAbosultePath = void 0;

const path = require('path'); // para llamar a métodos de path


const fs = require('fs'); // para llamar los métodos de fs
// Verifica si la ruta ingresada es absoluta.
// export const checkIfRouteIsAbosulte = (route) => path.isAbsolute(route);
// export const transformRelativePath = (route) => path.resolve(route);


const validateAbosultePath = route => {
  if (!path.isAbsolute(route)) {
    const pathAbs = path.resolve(route); // si es relativa resuelve que sea absoluta

    return pathAbs;
  }

  return route;
};

exports.validateAbosultePath = validateAbosultePath;

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

const checkIsMd = arrayFiles => arrayFiles.filter(element => path.extname(element) === '.md'); // esto para considerar en la programación


exports.checkIsMd = checkIsMd;

const readFile = route => fs.readFileSync(route, 'utf8');

exports.readFile = readFile;

const extractLink = route => {
  const newArrayLinks = [];
  const arrayFiles = fileReturn(route);
  const arrayMdFiles = checkIsMd(arrayFiles);
  const patron1 = /(^|[^!])\[(.*)\]\((.*)\)/g; // primer array de nombres y links con [] y ()

  const patron2 = /\((.*)\)/g; // para referencia

  const patron3 = /\[((.*))\]/g; // para texto

  arrayMdFiles.forEach(element => {
    const arrayResultMatch = readFile(element).match(patron1);
    const file1 = validateAbosultePath(element);

    if (arrayResultMatch !== null) {
      arrayResultMatch.forEach(e => {
        const hreference = e.match(patron2).toString().split(/[()]/)[1];
        const texto = e.match(patron3).toString().split(/[\\[\]]/)[1];
        newArrayLinks.push({
          href: hreference,
          text: texto,
          file: file1
        });
      });
    }
  });
  return newArrayLinks;
};

exports.extractLink = extractLink;
console.log(extractLink('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba'));