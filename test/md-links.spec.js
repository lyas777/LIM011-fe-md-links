import {
  checkIfRouteIsAbosulte,
  checkIsFile,
  fileReturn,
  checkIsMd,
} from '../src/md-links/path';

const ruta = '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md';
const ruta1 = 'test/prueba/paraTest/prueba.md';
const ruta2 = '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/src/md-links';
const array1 = [
  '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/src/md-links/links.js',
  '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/src/md-links/path.js',
];
const array2 = [
  '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/a/algo.md',
  '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/a/otro.js',
  '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md',
];
const array3 = [
  '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/a/algo.md',
  '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md',
];

describe('checkIfRouteIsAbosulte', () => {
  it('debería ser una función', () => {
    expect(typeof checkIfRouteIsAbosulte).toBe('function');
  });
  it('Debería verificar si la ruta es abosoluta', () => {
    expect(checkIfRouteIsAbosulte(ruta)).toStrictEqual(ruta);
  });

  it('Debería verificar devolver una ruta abosoluta', () => {
    expect(checkIfRouteIsAbosulte(ruta1)).toStrictEqual(ruta);
  });
});

describe('checkIsFile', () => {
  it('debería ser una función', () => {
    expect(typeof checkIsFile).toBe('function');
  });
  it('Debería verificar si la ruta es un archivo', () => {
    expect(checkIsFile(ruta)).toStrictEqual(true);
  });

  it('Debería verificar si la ruta no es un archivo', () => {
    expect(checkIsFile(ruta2)).toStrictEqual(false);
  });
});

describe('fileReturn', () => {
  it('debería ser una función', () => {
    expect(typeof fileReturn).toBe('function');
  });
  it('Debería verificar devolver una array de archivos', () => {
    expect(fileReturn(ruta2)).toStrictEqual(array1);
  });
});

describe('checkIsMd', () => {
  it('debería ser una función', () => {
    expect(typeof checkIsMd).toBe('function');
  });
  it('Debería verificar devolver una array de archivos .md', () => {
    expect(checkIsMd(array2)).toStrictEqual(array3);
  });
});
