import {
  linksValidate,
} from './validaLinks';
import { extractLink } from './path';

const fs = require('fs');
const path = require('path');

export default (route, options) => new Promise((resolve, reject) => {
  if (fs.existsSync(route)) {
    if (options && options.validate) {
      resolve((linksValidate(route)).then((e) => e));
    }
    if (options && options.validate === false) {
      resolve(extractLink(route));
    }
  } else {
    reject(new Error(`No se encuentra la ruta: ${path.resolve(route)}`));
  }
});
