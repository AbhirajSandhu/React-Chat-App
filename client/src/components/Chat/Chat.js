import React, { useState, useEffect } from "react";
import queryString from 'query-string'; // this module helps in retreiving data from URL
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://chating-app-by-sandhuz.herokuapp.com/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState(''); // pass in useState initial value of name
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // wasted lot of time so include this not forge

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {  // {name, room} in es6 syntax is same as in older version {name: name, room: room}
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);  // we passed an array here with values ENDPOINT and location.search only if these values changes we change our useEffect


  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []); // we want to run this useEffect only when array changes

  const sendMessage = (event) => {
    event.preventDefault();  // when we press button whole page gets refreshed, to prevent that use preventDefault so that only this component gets refreshed

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;