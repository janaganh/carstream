const HMKit = require('hmkit');

class HMKitConnection {

    constructor(connectionProperties) {
        this.connectionProperties = connectionProperties;
    }
    
    async setUpConnection()  {
        this.hmkit = new HMKit(this.connectionProperties.clientCertificate, this.connectionProperties.clientPrivatekey);
        this.accessCertificate = await this.hmkit.downloadAccessCertificate(this.connectionProperties.accessToken);
        this.vehicalSerial = this.accessCertificate.getVehicleSerial();
        return this.accessCertificate != null && this.vehicalSerial != null ? true : false;
     }
    
}

module.exports = function (connectionProperties) {
  return new HMKitConnection(connectionProperties);
};

module.exports.HMKitConnection = HMKitConnection;