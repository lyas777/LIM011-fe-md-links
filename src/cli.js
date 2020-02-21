#!/usr/bin/env node
import {
  OptionsValidateStats,
  optionValidate,
  optionStats,
} from './md-links/validaLinks';
import mdLinks from './md-links/mdLinks';

const path = require('path');
const colors = require('colors');

const route = process.argv[2];
const options = {
  stats: false,
  validate: false,
};

process.argv.forEach((element) => {
  if (element === '--stats' || element === '--s' || element === 's' || element === 'S') {
    options.stats = true;
  }
  if (element === '--validate' || element === '--v' || element === 'v' || element === 'V') {
    options.validate = true;
  }
});

if (!route) {
  console.log(colors.red('Ingrese la ruta de un directorio o archivo'));
} else {
  mdLinks(route, options)
    .then((array) => {
      if (array.length === 0) {
        return console.log(colors.blue('El archivo no tiene links'));
      } if (options && options.stats && options.validate) {
        return OptionsValidateStats(route).then(((res) => console.log(colors.yellow(res))));
      } if (options && options.stats) {
        return console.log(colors.yellow(optionStats(route)));
      } if (options && options.validate) {
        return optionValidate(route).then((res) => console.log(colors.yellow(res)));
      }
      const stringLinks = array.map((element) => `${path.relative(process.cwd(), element.file)} ${element.href} ${element.text}`);
      return console.log(colors.yellow(stringLinks.join('\n')));
    }).catch((err) => {
      console.log(colors.red(err.message));
    });
}
mdLinks('test/prueba/paraTest/prueba.md', { validate: true });
