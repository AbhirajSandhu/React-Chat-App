import React, { useState, useEffect } from 'react';
import queryString from 'query-string';  // this module helps in retreiving data from URL
import io from 'socket.io-client';
import './Chat.css';

let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState('');  // pass in useState initial value of name
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    location = { location };  // wasted lot of time so include this not forget

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => {

        });
        // {name, room} in es6 syntax is same as in older version {name: name, room: room}

        return () => {
            socket.emit('disconnect');
            // emit this even when disconnected, the same gets executed in server side index.js
            socket.off();
        }
    }, [ENDPOINT, location.search]);
    // we passed an array here with values ENDPOINT and location.search
    // only if these values changes we change our useEffect

    return (
        <h1>Chat</h1>
    )
}

export default Chat;