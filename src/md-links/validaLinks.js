
import { extractLink } from './path';

const fetch = require('node-fetch');


const validateLinks = (routesMd) => {
  const arrayObjectLinks = extractLink(routesMd);
  // console.log(arrayObjectLinks);
  const algo = arrayObjectLinks.map((elment) => elment.href);
  console.log(algo);
};
validateLinks('/home/lyas/Documentos/Laboratoria/Bootcamp/md-links/LIM011-fe-md-links/test/prueba');
