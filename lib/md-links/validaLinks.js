"use strict";

var _path = require("./path");

const fetch = require('node-fetch');

const validateLinks = routesMd => {
  const arrayObjectLinks = (0, _path.extractLink)(routesMd); // console.log(arrayObjectLinks);

  const algo = arrayObjectLinks.map(elment => elment.href);
  console.log(algo);
};

validateLinks('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba');