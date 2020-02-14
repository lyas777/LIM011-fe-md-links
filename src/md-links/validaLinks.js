
import { extractLink } from './path';
import { promises, resolve } from 'dns';

const fetch = require('node-fetch');
const path = require('path');

const linksValidate = (route) => {
  const arrayObjectLinks = extractLink(route);
  const arrayLinksPromise = arrayObjectLinks.map((link) => fetch(link.href)
    .then((response) => {
      if (response.ok) {
        return {
          ...link,
          statusText: response.statusText,
          status: response.status,
        };
      }
      return {
        ...link,
        statusText: 'FAIL',
        status: response.status,
      };
    })
    //
    .catch(() => ({
      ...link,
      statusText: 'FAIL',
      status: 'ERROR',
    })));
  return Promise.all(arrayLinksPromise);
};

// linksValidate('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/README.md').then((res) => console.log(res)).catch((e) => console.log(e));


// const prueba = (ruta) => (
//   fetch(ruta).then((response) => response.statusText).catch((error) => console.log(error)));

// prueba('http://google.com').then((e) => console.log(e));

const optionValidate = (route) => new Promise((resolve) => {
  linksValidate(route)
    .then((arrLinks) => {
      const strLinks = arrLinks.map((link) => `${path.relative(process.cwd(), link.file)} ${link.href} ${link.statusText} ${link.status} ${link.text}`);
      resolve(strLinks.join('\n'));
    });
});

optionValidate('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/README.md');
