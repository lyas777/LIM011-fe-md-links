describe('esAbosluta', () => {
    it('debería ser una función', () => {
      expect(typeof esAbosluta).toBe('function');
    });
  
    it('Debería verificar si la ruta es abosoluta', () => {
      expect(esAbosluta(ruta)).toStrictEqual('true');
    });

    it('Debería verificar si la ruta es abosoluta', () => {
      expect(esAbosluta(ruta)).toStrictEqual('false');
    });
  });