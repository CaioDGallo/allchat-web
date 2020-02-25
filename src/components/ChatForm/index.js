import React, { useState } from 'react';

import './styles.css';

function ChatForm({ sendMessage }) {
  const [messageInputValue, setMessageInputValue] = useState('');
  const [userValue, setUserValue] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    var messageObject = {
      'message': userValue + ': ' + e.target.messageInputValue.value,
      'id': Math.random(),
    }

    sendMessage(messageObject)
    setMessageInputValue('')
  }

  return (
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
    </form>
  );
}

export default ChatForm;
