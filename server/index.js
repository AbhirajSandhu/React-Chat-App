const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const router = require('./router');
app.use(router);  // now we can pass it as a middleware

io.on('connection', (socket) => {
    console.log('New Connection Made!');

    socket.on('join', ({name, room}, callback) => {
        console.log(name, room);
    })

    socket.console('disconnect', () => {
        console.log('User had Left!')
    })
})
// in a callback function we pass socket, this is going to be a socket
// that will be connected as a client side socket
// inside it only to disconnect, we will not pass any parameter as user had left

const PORT = process.env.PORT || 5000
server.listen( PORT, () => {
    console.log('Listening on port: 3000');
})

/* simply
    server.listen( 5000, () => {
    console.log('Listening on port: 3000');
}) */