import React, { useState } from 'react';

import './styles.css';
import ChatMessages from '../ChatMessages';

function ChatForm({ websocket, messages, setMessages, connect }) {
  const [messageInputValue, setMessageInputValue] = useState('');
  const [userValue, setUserValue] = useState('');
  const [connected, setConnected] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    var messageObject = {
      'message': userValue + ': ' + e.target.messageInputValue.value,
      'id': Math.random(),
    }

    if (connected) {
      websocket.send(JSON.stringify(messageObject))

      setMessageInputValue('')
      setMessages(messageObject)
    }else{
      alert('You need to connect first')
    }
  }

  return (
    <div id='chat'>

      <ChatMessages messages={messages} />

      <form onSubmit={handleSubmit} id='chat-form'>
        <div className="input-block">
          <label htmlFor="userValue">Username</label>
          <input
            name="userValue"
            id="userValue"
            required
            value={userValue}
            onChange={e => setUserValue(e.target.value)}
          />
          <label htmlFor="messageInputValue">Message</label>
          <input
            name="messageInputValue"
            id="messageInputValue"
            required
            value={messageInputValue}
            onChange={e => setMessageInputValue(e.target.value)}
          />
        </div>

        <button type="submit">Send</button>
        <button type="button" onClick={() => {
          if (userValue !== '') {
            if (!connected) {
              connect(userValue)
              setConnected(true)
            } else {
              alert('Client already connected')
            }
          } else {
            alert('User is required.')
          }
        }}>Connect</button>
      </form>
    </div>
  );
}

export default ChatForm;
