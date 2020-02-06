const path = require('path');

export const checkIfRouteIsAbsulte = (route) => path.isAbsolute(route);
export const transformRelativePath = (route) => path.resolve(route);
