const path = require('path'); // para llamar a métodos de path
const fs = require('fs'); // para llamar los métodos de fs

// Verifica si la ruta ingresada es absoluta.
// export const checkIfRouteIsAbosulte = (route) => path.isAbsolute(route);
// export const transformRelativePath = (route) => path.resolve(route);

export const convertToAbsolutePath = (route) => (
  path.isAbsolute(route) ? route : path.resolve(route));

export const checkIsFile = (route) => fs.statSync(route).isFile();

export const fileReturn = (route) => {
  let arrayFilePath = [];
  if (checkIsFile(route)) {
    arrayFilePath.push(route);
  } else {
    const files = fs.readdirSync(route);
    // console.log('verifica los directorios', files); // lee el directorio de la ruta
    files.forEach((element) => {
      const newRoute = path.join(route, element);
      // console.log('que me da:', newRoute);
      arrayFilePath = arrayFilePath.concat(fileReturn(newRoute));
      // console.log(arrayOfPathFile);
    });
  }
  return arrayFilePath;
};

export const checkIsMd = (arrayFiles) => arrayFiles.filter((element) => path.extname(element) === '.md');
export const readFile = (route) => fs.readFileSync(route, 'utf8');

// guarda los link del archivo .md en un array de objetos
export const extractLink = (route) => {
  const newArrayLinks = [];
  const arrayFiles = fileReturn(route);
  const arrayMdFiles = checkIsMd(arrayFiles);
  const patron1 = /(^|[^!])\[(.*)\]\((.*)\)/g; // primer array de nombres y links con [] y ()
  const patron2 = /\((.*)\)/g; // para referencia
  const patron3 = /\[((.*))\]/g; // para texto
  arrayMdFiles.forEach((element) => {
    const arrayResultMatch = readFile(element).match(patron1);
    const file1 = convertToAbsolutePath(element);
    if (arrayResultMatch !== null) {
      arrayResultMatch.forEach((e) => {
        let hreference = e.match(patron2).toString().split(/(http.*)\)/)[1];
        const noURL = e.match(patron2).toString().split((/[()]/))[1];
        if (hreference === undefined) hreference = noURL;
        const texto = e.match(patron3).toString().split(/[\\[\]]/)[1];
        newArrayLinks.push({
          href: hreference,
          text: texto,
          file: file1,
        });
      });
    }
  });
  return newArrayLinks;
};
