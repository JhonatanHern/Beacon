const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/fn/*', { target: 'http://localhost:4141/' }));
  app.use(proxy('/*.mp3', { target: 'http://localhost:4141/' }));
};