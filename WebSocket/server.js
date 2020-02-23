const webSocketServer = require('ws').Server;
const wss = new webSocketServer({port: 3000});

wss.on("connection", function(ws) {
    ws.send("Hello, I am Server.");
    ws.on("message", function(message) {
        console.log("Received message:", message)
    });
});