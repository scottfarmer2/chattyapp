const express = require('express');
const SocketServer = require('ws').Server;
const nodeUuid = require('node-uuid');
const WebSockets = require('ws')
// Set the port to 4000
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server: server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// wss.broadcast = function broadcast(data) {
//     wss.clients.forEach(function each(client) {
//         if (client.readyState === WebSockets.OPEN) {
//             client.send(data)
//         }
//     });
// };


wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    let data = JSON.parse(message);
    data.id = nodeUuid.v1();
    console.log(`User ${data.username} said ${data.content}`);
    console.log(data)
    wss.clients.forEach(function each(client) {
        // if (client.readyState === WebSockets.OPEN) {
            client.send(JSON.stringify(data))
        // }
    });
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});