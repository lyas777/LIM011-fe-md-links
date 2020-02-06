"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformRelativePath = exports.checkIfRouteIsAbsulte = void 0;

const path = require('path');

const checkIfRouteIsAbsulte = route => path.isAbsolute(route);

exports.checkIfRouteIsAbsulte = checkIfRouteIsAbsulte;

const transformRelativePath = route => path.resolve(route);

exports.transformRelativePath = transformRelativePath;