import React, { useState } from 'react';

function ChatForm({ websocket, messages, setMessages }) {
  const [chatMessages, setChatMessages] = useState(messages);
  const [messageInputValue, setMessageInputValue] = useState('');

  console.log(messages)

  async function handleSubmit(e) {
    e.preventDefault();

    let msg = {
      message: e.target.messageInputValue.value,
    }

    websocket.send(msg.message)
    
    setMessageInputValue('')

    setMessages(msg)
  }

  return (
    <div>
      {/* //Separate this into its own component */}
      <ul>
          {messages.map(message => (
            //FIX THIS, A UNIQUE KEY IS A MUST
            <p key={Math.random()*10}>{message.message}</p>
          ))}
        </ul>
        {/* // -- */}
      <form onSubmit={handleSubmit}>
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
