const HMKit = require('hmkit');
const HMKitConnection = require('./hmkit.connection');
const Processor = require('./processor');

class Service {
  
  constructor (options) {
        this.options = options;
        
        this.events = ['data'];
  }

  setup(app) {
      this.app = app;
      this.processor = new Processor(this);
  }    
    
  find (params) {
    return Promise.resolve([]);
  }

  get (id, params) {   
      if (id == 'stop') {
        this.processor.stopRunningQueries();
        return [];  
      }
      return this.processor.process(id);
  }

  create (connection, params) {  
    let hmkitConnection = new HMKitConnection(connection);
    try {
        let result = hmkitConnection.setUpConnection();
        this.app.set('hmkit', hmkitConnection);
        return result;
    }catch(error) {
        return Promise.reject(error);
    }
  }
   

  update (id, data, params) {
    return Promise.resolve(data);
  }

  patch (id, data, params) {
    return Promise.resolve(data);
  }

  remove (id, params) {
    return Promise.resolve({ id });
  }
    
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
