const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');
app.use(router);  // now we can pass it as a middleware

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error)  return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`});

        socket.join(user.room);  // user object contains all the parameters

        callback();
    });

    // after this event is emitted this callback will run
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message});
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
        }
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