const assert = require('assert');
const app = require('../../src/app');

describe('\'connection\' service', () => {
  it('registered the service', () => {
    const service = app.service('connection');

    assert.ok(service, 'Registered the service');
  });
});
