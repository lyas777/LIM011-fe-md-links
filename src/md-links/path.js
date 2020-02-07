const path = require('path'); // para llamar a métodos de path
const fs = require('fs'); // para llamar los métodos de fs


// console.log(path);
// Verifica si la ruta ingresada es absoluta.
export const checkIfRouteIsAbosulte = (route) => path.isAbsolute(route);

// console.log(checkIfRouteIsAbosulte('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/README.md'));

// convierte una ruta relativa en abosoluta
export const transformRelativePath = (route) => path.resolve(route);
// console.log(transformRelativePath('README.md'));

export const checkIsFile = (route) => fs.statSync(route).isFile();

export const fileReturn = (route) => {
  let arrayOfPathFile = [];
  if (checkIsFile(route)) {
    arrayOfPathFile.push(route);
  } else {
    const files = fs.readdirSync(route);
    console.log('verifica los directorios', files); // lee el directorio de la ruta
    files.forEach((file) => {
      const newRoute = path.join(route, file);
      console.log('que me da:', newRoute);
      arrayOfPathFile = arrayOfPathFile.concat(fileReturn(newRoute));
    });
  }
  return arrayOfPathFile;
};
// console.log(fileReturn('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba'));

export const checkIsMd = (route) => fileReturn(route).filter((element) => path.extname(element) === '.md');
// esto para considerar en la programación
export const readFile = (route) => fs.readFileSync(route, 'utf8');

// console.log(readFile('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md'));

// buscar links

const re = /\[(.+)\]\((.+)\)/;
//  const str = '<html>\n    <head></head>\n    <body>\n        <h1>Example</h1>\n        <p>Look a this great link : <a href="https://stackoverflow.com">Stackoverflow</a> http://anotherlinkoutsideatag</p>\n\n        Copyright <a href="https://stackoverflow.com">Stackoverflow</a>\n    </body>\';\n';
const mdFile = readFile('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md');

let m;
m = re.exec(mdFile);
console.log('resultado', m);
const links = [];

/*
while ((m = re.exec(str)) !== null) {
  if (m.index === re.lastIndex) {
    re.lastIndex++;
  }
  console.log(m[0]); // The all substring
  console.log(m[1]); // The href subpart
  console.log(m[2]); // The anchor subpart

  links.push({
    match: m[0], // the entire match
    href: m[1], // the first parenthesis => (https?:\/\/.*)
    anchor: m[2], // the second one => ([^<]*)
  });
}
*/