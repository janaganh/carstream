// Establish a Socket.io connection
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(feathers.hooks());


// Shows the chat page
function get() {
 
  // Find all users
  client.service('query').get().then(page => {
    console.log(page);
  });
}

