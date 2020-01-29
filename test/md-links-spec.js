import { checkIfRouteIsAbosulte } from '../src/main';

const ruta = '/home/lyas/Documents/laboratoria/LIM011-fe-md-links/test/prueba/paraTest/prueba.md';

describe('checkIfRouteIsAbosulte', () => {
  it('debería ser una función', () => {
    expect(typeof checkIfRouteIsAbosulte).toBe('function');
  });
  it('Debería verificar si la ruta es abosoluta', () => {
    expect(checkIfRouteIsAbosulte(ruta)).toStrictEqual(true);
  });

  it('Debería verificar si la ruta es abosoluta', () => {
    expect(checkIfRouteIsAbosulte(ruta)).toStrictEqual(false);
  });
});
