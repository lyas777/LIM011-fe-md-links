"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validaLinks = require("./validaLinks");

var _path = require("./path");

const fs = require('fs');

const path = require('path');

var _default = (route, options) => new Promise((resolve, reject) => {
  if (fs.existsSync(route)) {
    if (options.validate === true) {
      resolve((0, _validaLinks.linksValidate)(route).then(e => e));
    }

    if (options.validate === false) {
      resolve((0, _path.extractLink)(route));
    }
  } else {
    reject(new Error(`No se encuentra la ruta ingresada: ${path.resolve(route)}`));
  }
});

exports.default = _default;