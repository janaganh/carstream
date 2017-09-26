const query = require('./query/query.service.js');
const connection = require('./connection/connection.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(query);
  app.configure(connection);
};
