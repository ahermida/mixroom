/**
 *  Manages websocket connections
 */
import config from './socket.js';

//location of ws enpoint
const ws = config.ws;

const socket = (() => {

  //grab the connection
  const connection = new WebSocket(ws);

  //handle incoming messages
  connection.onmessage = (event) => {

    //get message
    let message = JSON.parse(event.data);

    
  };

  //return the interface
  const manager = {
    connection: connection,
    joinRoom: room => ,
    leaveRoom: () => ,
    send: message => ,
    edit: (newMessage, id) => ,
    delete: id => ,
    receive: message =>
  };

  return manager;

})();
