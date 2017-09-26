// Initializes the `connection` service on path `/connection`
const createService = require('feathers-nedb');
const createModel = require('../../models/connection.model');
const hooks = require('./connection.hooks');
const filters = require('./connection.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'connection',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/connection', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('connection');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
