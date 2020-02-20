import {
  linksValidate,
}
  from './validaLinks';
import { extractLink } from './path';

const fs = require('fs');
const path = require('path');

export const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (fs.existsSync(route)) {
    if (options.validate === true) {
      resolve(linksValidate(route));
    }
    if (options.validate === false) {
      resolve(extractLink(route));
    }
  } else {
    reject(new Error(`No se encuentra la ruta: ${path.resolve(route)}`));
  }
});

mdLinks('ruta', { validate: true }).catch((e) => console.log(e));

export const printMdLinks = (route, options) => {
  mdLinks(route, options)
    .then((e) => console.log(e));
};


// const mdLinks = (route, options) => {
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
