import {
  convertToAbsolutePath,
  checkIsFile,
  fileReturn,
  checkIsMd,
  extractLink,
} from '../src/md-links/path';
import {
  linksValidate,
} from '../src/md-links/validaLinks';

const path = require('path');

const ruta = path.join(process.cwd(), 'test', 'prueba', 'paraTest', 'prueba.md');
const ruta1 = 'test/prueba/paraTest/prueba.md';
const ruta2 = path.join(process.cwd(), 'src', 'md-links');
const array1 = [
  `${process.cwd()}/src/md-links/path.js`,
  `${process.cwd()}/src/md-links/validaLinks.js`,
];
const array2 = [
  `${process.cwd()}/test/prueba/a/algo.md`,
  `${process.cwd()}/test/prueba/a/otro.js`,
  `${process.cwd()}/test/prueba/paraTest/prueba.md`,
];
const array3 = [
  `${process.cwd()}/test/prueba/a/algo.md`,
  `${process.cwd()}/test/prueba/paraTest/prueba.md`,
];
const ruta3 = path.join(process.cwd(), 'test', 'prueba');
const array4 = [
  {
    href: 'link.roto.com',
    text: 'link',
    file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  },
  {
    href: 'https://www.google.com/gatos',
    text: 'Error 404',
    file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  },
];
const linkOk = {
  href: 'https://nodejs.org/',
  text: 'Node.js',
  file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  statusText: 'OK',
  status: 200,
};
const link404 = {
  href: 'https://www.google.com/gatos',
  text: 'Error 404',
  file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  statusText: 'FAIL',
  status: 404,
};
const linkFail = {
  href: 'link.roto.com',
  text: 'link',
  file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  statusText: 'FAIL',
  status: 'ERROR',
};

describe('convertToAbsolutePath', () => {
  it('debería ser una función', () => {
    expect(typeof convertToAbsolutePath).toBe('function');
  });
  it('Debería verificar si la ruta es abosoluta', () => {
    expect(convertToAbsolutePath(ruta)).toStrictEqual(ruta);
  });

  it('Debería verificar devolver una ruta abosoluta', () => {
    expect(convertToAbsolutePath(ruta1)).toStrictEqual(ruta);
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

describe('extractLink', () => {
  it('debería ser una función', () => {
    expect(typeof extractLink).toBe('function');
  });
  it('debería retornar un array de objetos', () => {
    expect(extractLink(ruta3)).toStrictEqual(array4);
  });
});

describe('linksValidate', () => {
  it('debería ser una función', () => {
    expect(typeof linksValidate).toBe('function');
  });
  it('debería devolver una promesa con estado Fail', () => {
    linksValidate(ruta).then((result) => {
      expect(result[0]).toEqual((linkFail));
    });
  });
  it('debería devolver una promesa con estado 404', () => {
    linksValidate(ruta).then((result) => {
      expect(result[1]).toEqual((link404));
    });
  });
  it('debería devolver una promesa con estado OK', () => {
    linksValidate(ruta).then((result) => {
      expect(result[2]).toEqual((linkOk));
    });
  });
});
