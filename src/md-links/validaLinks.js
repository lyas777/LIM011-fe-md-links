
import { extractLink } from './path';

const fetch = require('node-fetch');

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

const imprimirPromesa = (route) => {
  linksValidate(route)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error));
};

imprimirPromesa('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md');
