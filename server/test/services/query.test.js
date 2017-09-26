const assert = require('assert');
const app = require('../../src/app');

describe('\'query\' service', () => {
  it('registered the service', () => {
    const service = app.service('query');

    assert.ok(service, 'Registered the service');
  });
});
