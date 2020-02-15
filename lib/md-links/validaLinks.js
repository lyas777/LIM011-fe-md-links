"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imprimirPromesa = exports.linksValidate = void 0;

var _path = require("./path");

const fetch = require('node-fetch'); // eslint-disable-next-line import/prefer-default-export


const linksValidate = route => {
  const arrayObjectLinks = (0, _path.extractLink)(route);
  const arrayLinksPromise = arrayObjectLinks.map(link => fetch(link.href).then(response => {
    if (response.ok) {
      return { ...link,
        statusText: response.statusText,
        status: response.status
      };
    }

    return { ...link,
      statusText: 'FAIL',
      status: response.status
    };
  }) //
  .catch(() => ({ ...link,
    statusText: 'FAIL',
    status: 'ERROR'
  })));
  return Promise.all(arrayLinksPromise);
}; // const prueba = (ruta) => (
//   fetch(ruta).then((response) => response.statusText).catch((error) => console.log(error)));
// prueba('http://google.com').then((e) => console.log(e));
// console.log(typeof linksValidate);


exports.linksValidate = linksValidate;

const imprimirPromesa = route => {
  linksValidate(route).then(res => {
    console.log(res);
  }).catch(error => console.log(error));
}; // const arr = [1,2,3,4,4,5,6,6,6,6,6];
// console.log(arr);
// const newArr = new Set(arr);
// console.log(newArr);


exports.imprimirPromesa = imprimirPromesa;
console.log(imprimirPromesa('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md'));