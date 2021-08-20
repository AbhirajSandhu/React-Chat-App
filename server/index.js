const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);  // now we can pass it as a middleware

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);  // user object contains all the parameters

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) }); // to know new state of the user in room

    callback();
  });

  socket.on('sendMessage', (message, callback) => {  // after this event is emitted this callback will run
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

// in a callback function we pass socket, this is going to be a socket
// that will be connected as a client side socket
// inside it only to disconnect, we will not pass any parameter as user had left

// server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
const PORT = process.env.PORT || 5000
server.listen( PORT, () => {
    console.log('Listening on port: 5000');
})

/* simply
    server.listen( 5000, () => {
    console.log('Listening on port: 5000');
}) */