import { extractLink } from './path';

const fetch = require('node-fetch');
const path = require('path');

// Valida los links y los almacena en el array de objetos
export const linksValidate = (route) => {
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

// Opciones para validar y mostrar y estadisticas
export const optionValidate = (route) => linksValidate(route)
  .then((arrayObjtLink) => {
    const strLinks = arrayObjtLink.map((element) => `${path.relative(process.cwd(), element.file)} ${element.href} ${element.statusText} ${element.status} ${element.text}`);
    return strLinks.join('\n');
  });

export const uniqueLinks = (arrLinks) => (
  [...new Set(arrLinks.map((link) => link.href))]); // con ...new te devuelve array
export const brokenLinks = (arrValidateLinks) => (
  arrValidateLinks.filter((link) => link.status >= 400));

// Función que devuelve los stats de los links en string
export const optionStats = (route) => {
  const arrMdLinks = extractLink(route);
  return `Total: ${arrMdLinks.length}\nUnique: ${uniqueLinks(arrMdLinks).length}`;
};
// Función que devuelve los stats y validación de los links en string
export const OptionsValidateStats = (route) => linksValidate(route)
  .then((links) => `Total: ${links.length}\nUnique: ${uniqueLinks(links).length}\nBroken: ${brokenLinks(links).length}`);
