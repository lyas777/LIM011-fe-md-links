import {
  convertToAbsolutePath,
  checkIsFile,
  fileReturn,
  checkIsMd,
  extractLink,
} from '../src/md-links/path';
import {
  linksValidate,
  optionValidate,
  optionStats,
  OptionsValidateStats,
} from '../src/md-links/validaLinks';
import mdLinks from '../src/md-links/mdLinks';

const path = require('path');

const ruta = path.join(process.cwd(), 'test', 'prueba', 'paraTest', 'prueba.md');
const ruta1 = 'test/prueba/paraTest/prueba.md';
const ruta2 = path.join(process.cwd(), 'src', 'md-links');
const array1 = [
  `${process.cwd()}/src/md-links/mdLinks.js`,
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
    text: 'LinkRoto',
    file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  },
  {
    href: 'https://www.google.com/gatos',
    text: 'Error404',
    file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  },
];
const array5 = [
  {
    href: 'link.roto.com',
    text: 'LinkRoto',
    file: '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md',
    statusText: 'FAIL',
    status: 'ERROR',
  },
  {
    href: 'https://www.google.com/gatos',
    text: 'Error404',
    file: '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md',
    statusText: 'FAIL',
    status: 404,
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba/paraTest/prueba.md',
    statusText: 'OK',
    status: 200,
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
  text: 'Error404',
  file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  statusText: 'FAIL',
  status: 404,
};
const linkFail = {
  href: 'link.roto.com',
  text: 'LinkRoto',
  file: `${process.cwd()}/test/prueba/paraTest/prueba.md`,
  statusText: 'FAIL',
  status: 'ERROR',
};

describe('convertToAbsolutePath', () => {
  it('debería ser una función', () => {
    expect(typeof convertToAbsolutePath).toBe('function');
  });
  it('Debería devolver una ruta absoluta', () => {
    expect(convertToAbsolutePath(ruta)).toStrictEqual(ruta);
  });

  it('Debería devolver una ruta abosoluta', () => {
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
  it('Debería devolver una array de archivos .md', () => {
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
  it('debería ser una función', (done) => {
    expect(typeof linksValidate).toBe('function');
    done();
  });
  it('debería devolver una promesa con estado Fail', (done) => linksValidate(ruta).then((result) => {
    expect(result[0]).toEqual((linkFail));
    done();
  }));
  it('debería devolver una promesa con estado 404', (done) => linksValidate(ruta).then((result) => {
    expect(result[1]).toEqual((link404));
    done();
  }));
  it('debería devolver una promesa con estado OK', (done) => linksValidate(ruta).then((result) => {
    expect(result[2]).toEqual((linkOk));
    done();
  }));
});

describe('option validate', () => {
  it('Should return the validated links', () => optionValidate(ruta)
    .then((result) => {
      expect(result).toEqual(`${ruta1} link.roto.com FAIL ERROR LinkRoto\n${ruta1} https://www.google.com/gatos FAIL 404 Error404\n${ruta1} https://nodejs.org/ OK 200 Node.js`);
    }));
});

describe('option stats', () => {
  it('Should return links statistics in a string', () => {
    expect(optionStats(ruta)).toEqual('Total: 3\nUnique: 3');
  });
});

describe('option validate and stats', () => {
  it('Should return the links statistics and links validations in a string', () => OptionsValidateStats(ruta)
    .then((result) => {
      expect(result).toEqual('Total: 3\nUnique: 3\nBroken: 1');
    }));
});

describe('mdLinks', () => {
  it('debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('debería retornarme un array de objetos con informacón de links y estados', (done) => mdLinks(ruta, { validate: true }).then((result) => {
    expect(result).toStrictEqual(array5);
    done();
  }));
  it('debería retornarme un array de objetos con información de links', (done) => mdLinks(ruta, { validate: false }).then((result) => {
    expect(result).toStrictEqual(array4);
    done();
  }));
  it('debería devolver un mensage de error: No se encuentra la ruta ingresada', () => mdLinks('no-route')
    .catch((err) => {
      expect(err.message).toEqual(`No se encuentra la ruta ingresada: ${path.join(process.cwd(), 'no-route')}`);
    }));
});
