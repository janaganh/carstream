import imgRemove from './img/ic_clear_white_24px.svg';
import imgCar from './img/ic_directions_car_black_24px.svg';
import imgConnect from  './img/ic_router_black_24px.svg';

import Feathers from  'feathers/client';
import Rest from  'feathers-rest/client';
import $ from 'jquery';


export default class ConnectionController {

    constructor($scope, connectionService) {
        'ngInject';
    
        this.img = {
            remove: imgRemove,
            car: imgCar,
            connect: imgConnect
        };
        this.scope = $scope;
        this.connectionService = connectionService;
        this._connections = [];
   
    }
 
    $onInit() {
        this.setUpConnection();
    }
        
  
    setUpConnection() { 
      let rest = new Rest('http://localhost:3030');
      
      this.client = new Feathers();
      this.client.configure(rest.jquery($));
    
      this.findAll();
   }
    
   addConnection() {
        if (!this.valiadate(false)) {
            console.error('validation failed');
            return;
        }
        let cloneConnection = Object.assign({}, this.connection);
        
        delete cloneConnection._id; 
        let promise =  this.client.service("connection").create(cloneConnection);
        
        promise
            .then (response => this.findAll())
            .catch(error => console.log(error));
    }
    
    updateConnection() {
         if (!this.valiadate(true)) {
            console.error('validation failed');
            return;
         }
        
        let cloneConnection = Object.assign({}, this.connection);
        
        delete cloneConnection._id; 
        let promise =  this.client.service("connection").update(this.connection._id, cloneConnection);
        
        promise
            .then (response => this.findAll())
            .catch(error => console.log(error));
    }
    
    fetchConnection(id) {
        let promise =  this.client.service("connection").get(id);
        promise
            .then (response => this.connection = response)
            .catch(error => console.log(error));
    }
    
    findAll() {
        let promise =  this.client.service("connection").find();
         
        promise
            .then (response => this.connections = response.data)
            .catch( error => console.log(error));
    }
    
    removeConnection(id) {
        let promise =  this.client.service("connection").remove(id);
        promise
            .then ( () => this.findAll())
            .catch( error => console.log(error));
    }
    
    _valiadate(isUpdate = false, data) {
        let keys = ['name', 'clientCertificate' ,'clientPrivatekey', 'accessToken'];
        let ok = keys.every(key => data && data[key] && data[key].trim() != '');
        if (ok) {
            if (isUpdate && !(data && data['_id'] && data['_id'].trim() != '')) {
                return false;
            }
            return true;
        }
        
        return false;
    }
    
    validate(isUpdate = false) {
        return this._valiadate(isUpdate, this.connection);
    }

    
    
    get connections () {
        return this._connections;
    }
    
    set connections(connections) {
        this._connections = connections;
        this.scope.$apply();
    }
    
    connect(connection) {
       if (!this._valiadate(true, connection)) {
            console.error('validation failed');
            return;
        }
       
        this.connectionService.setUpConnection(connection);
        
    }

}
