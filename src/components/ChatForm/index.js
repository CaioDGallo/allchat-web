import React, { useState } from 'react';

function ChatForm({ onSubmit }) {
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      message,
    });

    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="message">Message</label>
        <input 
          name="message" 
          id="message" 
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default ChatForm;
