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


function randomColor() {
  const num = Math.floor(Math.random() * 4 + 1);
    switch(num){
        case 1:
        return 'red';
            break;
        case 2:
        return 'blue';
            break;
        case 3:
        return 'green';
            break;
        case 4:
        return 'yellow';
            break;
    }
}

var userCount = 0;

wss.on('connection', (ws) => {
  console.log('Client connected');
  userCount += 1;
    let color = randomColor();
    let newColor = {color: color, type: "incomingColor"};
    let number = {type: "connectedUsers", userCount: userCount};
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSockets.OPEN) {
            client.send(JSON.stringify(number));
        }
    });

    ws.send(JSON.stringify(newColor));


  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    data.id = nodeUuid.v1();
    switch(data.type) {
        case "postMessage":
        data.type = "incomingMessage"
            wss.clients.forEach(function each(client) {
            if (client.readyState === WebSockets.OPEN) {
                client.send(JSON.stringify(data))
            }
        });
            break;
        case "postNotification":
        data.type = "incomingNotification";
        data.content = `User ${data.oldUserName} changed their name to ${data.username}`;
            wss.clients.forEach(function each(client) {
            if (client.readyState === WebSockets.OPEN) {
                client.send(JSON.stringify(data))
            }
        });
            break;
            default:
            throw new err ("error" + data.type);
    }

  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    userCount -= 1

    number = {type: "connectedUsers", userCount: userCount}
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSockets.OPEN) {
            client.send(JSON.stringify(number));
        }
    });

  });

});


