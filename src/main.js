const path = require('path');

export const checkIfRouteIsAbosulte = (route) => path.isAbsolute(route);
export const transformRelativePath = (route) => path.resolve(route);
