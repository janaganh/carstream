/* eslint-disable no-unused-vars */
//import HMKit from 'hmkit';
const HMKit = require('hmkit');
const HMKitConnection = require('./hmkit.connection');

class Service {
  
    constructor (app) {
        this.app = app;
  }

    
  find (params) {
    return Promise.resolve([]);
  }

  async get (id, params) {
    
    let hmkitConnection = this.app.get('hmkit');
     
    let  response =  hmkitConnection.hmkit.telematics.sendCommand(
                hmkitConnection.accessCertificate.getVehicleSerial(),
                hmkitConnection.hmkit.commands.DiagnosticsCommand.getState()
      );  

      return response;
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

module.exports = function (app) {
  return new Service(app);
};

module.exports.Service = Service;
