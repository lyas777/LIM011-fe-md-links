const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch,
});

fetchMock.mock('https://nodejs.org/', 200);
fetchMock.mock('https://www.google.com/gatos', 404);
fetchMock.mock('link.roto.com', {
  throws: new Error('Failed to fetch'),
});

module.exports = fetchMock;
