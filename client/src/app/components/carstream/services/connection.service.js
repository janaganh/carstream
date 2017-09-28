import feathers from  'feathers/client';
import socketio from  'feathers-socketio/client';
import io from 'socket.io-client';



export default class ConnectionService {
  
  setUpConnection(connectionProperties) { 
        this.socket = new io('http://localhost:3030/');
        this.client = new feathers();
        this.client.configure(new socketio(this.socket, {timeout: 500000}));
      
        let promise =  this.client.service("query").create(connectionProperties);
        promise
            .then (response => { 
                if (response === true) {
                  console.log('Connected');  
                } else { 
                  console.log('Couldn\'t connect');
                  this.socket = null;
                  this.client = null; 
                }
            })
            .catch( error => console.log(error));
  }

  get connection() {
     return this.client;
  }

  addListener(handler) {
    //this.socket.on("news",(message)=>console.log("NEWS="+message));
    
  }    
      
}
