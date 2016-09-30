/**
 *  Manages websocket connections
 */
import config from './config.js';

//location of ws enpoint
const ws = config.ws;

//grab the connection
const connection = new WebSocket(ws);

connection.addEventListener('open', event => {
  console.log('Socket opened!');
});

//handle incoming messages
connection.addEventListener('message', event => {
  //get message
  let message = JSON.parse(event.data);

  //separate by kind
  switch (message.kind) {

    //for now the only message we're sending is that to add a message
    case 'thread': ;
    break;
  }
});

//simple helper function to wait for the condition and try again each interval
function waitFor(check, interval, func, args) {
  if (check()) {
    func.apply(this, args);
  } else {
    window.setTimeout(() => waitFor(check, interval, func, args), interval);
  }
}

//little interface to deal with websockets socket
const socket = {
  inRoom: false,
  connection: connection,
  joinRoom: room => {
    if (socket.inRoom) {
      socket.leaveRoom();
    }
    //make sure we're connected befor we start sending stuff
    waitFor(() => connection.readyState === 1, 100, () => {
      connection.send(JSON.stringify({
        kind: 'join',
        thread: room
      }));
      console.log('sent');
    }, [room]);
    socket.inRoom = true;
  },
  leaveRoom: () => {
    socket.inRoom = false;
    connection.send(JSON.stringify({
      kind: 'leave'
    }));
  },
  send: message => {
    connection.send(JSON.stringify({
      kind: 'thread',
      body: message
    }));
  },
  edit: (newMessage, id) => console.log('edit'),
  delete: id => console.log('delete'),
  receive: message => console.log('recieve')
};

window.socket = socket;


export default socket;
