"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printMdLinks = exports.mdLinks = void 0;

var _validaLinks = require("./validaLinks");

var _path = require("./path");

const fs = require('fs');

const path = require('path');

const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (fs.existsSync(route)) {
    if (options.validate === true) {
      resolve((0, _validaLinks.linksValidate)(route));
    }

    if (options.validate === false) {
      resolve((0, _path.extractLink)(route));
    }
  } else {
    reject(new Error(`No se encuentra la ruta: ${path.resolve(route)}`));
  }
});

exports.mdLinks = mdLinks;
mdLinks('ruta', {
  validate: true
}).catch(e => console.log(e));

const printMdLinks = (route, options) => {
  mdLinks(route, options).then(e => console.log(e));
}; // const mdLinks = (route, options) => {
//   if (options.validate === true) {
//     return linksValidate(route)
//       .then((arrayLinks) => arrayLinks);
//   }
//   if (options.validate === false) {
//     const arrMdLinks = extractLink(route);
//     return arrMdLinks;
//   }
// };
// console.log(mdLinks('test/prueba/paraTest/prueba.md', ));

/* const mdLinks = (route, options) => {
  if (options === '--status' || options === '--s') {
    const arrMdLinks = extractLink(route);
    const str = `Total: ${arrMdLinks.length}\nUnique: ${uniqueLinks(arrMdLinks).length}`;
    return str;
  }
  if (options === '--validate' || options === '--v') {
    return linksValidate(route)
      .then((arrayObjtLink) => {
        const strLinks = arrayObjtLink.map((element) => `${path.relative(process.cwd(),
          element.file)} ${element.href} ${element.statusText} ${element.status} ${element.text}`);
        return strLinks.join('\n');
      });
  }
*/


exports.printMdLinks = printMdLinks;