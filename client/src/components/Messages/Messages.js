import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';

import './Messages.css'

const Messages = ({ messages, name }) => ( /* name to differentiate b/w users */
    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
    </ScrollToBottom>
  );
  //  when messages get higer than the height of the container so used ScrollToBottom

export default Messages;