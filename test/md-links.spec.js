import { checkIfRouteIsAbsulte, transformRelativePath } from '../src/main';

const ruta = '/home/lyas/Documents/laboratoria/LIM011-fe-md-links/test/prueba/paraTest/prueba.md';
const ruta1 = 'test/prueba/paraTest/prueba.md';

describe('checkIfRouteIsAbsulte', () => {
  it('debería ser una función', () => {
    expect(typeof checkIfRouteIsAbsulte).toBe('function');
  });
  it('Debería verificar si la ruta es abosoluta', () => {
    expect(checkIfRouteIsAbsulte(ruta)).toStrictEqual(true);
  });

  it('Debería verificar si la ruta es abosoluta', () => {
    expect(checkIfRouteIsAbsulte(ruta1)).toStrictEqual(false);
  });
});

describe('transformRelativePath', () => {
  it('debería ser una función', () => {
    expect(typeof transformRelativePath).toBe('function');
  });
});
