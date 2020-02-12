import React, { useState } from 'react';

import './styles.css';
import ChatMessages from '../ChatMessages';

function ChatForm({ websocket, messages, setMessages }) {
  const [messageInputValue, setMessageInputValue] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    var messageObject = {
      'message': e.target.messageInputValue.value,
      'id': Math.random(),
      'user': 'Usuário teste',
  }

    websocket.send(JSON.stringify(messageObject))
    
    setMessageInputValue('')
    setMessages(messageObject)
  }

  return (
    <div id='chat'>

      <ChatMessages messages={messages} />

      <form onSubmit={handleSubmit} id='chat-form'>
        <div className="input-block">
          <label htmlFor="messageInputValue">Message</label>
          <input
            name="messageInputValue"
            id="messageInputValue"
            required
            value={messageInputValue}
            onChange={e => setMessageInputValue(e.target.value)}
            />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default ChatForm;
