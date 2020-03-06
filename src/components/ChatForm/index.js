import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './styles.css';

function ChatForm() {
  const [messageInputValue, setMessageInputValue] = useState('');
  const [userValue, setUserValue] = useState('');
  const socket = useSelector(state => state.socket);
  const currentRoomId = useSelector(state => state.currentRoomId);
  const dispatch = useDispatch();

  function sendMessage(messageObject) {
    dispatch({ type: 'STORE_MESSAGE', messages: messageObject })
    //socket.emit('message', messageObject)
    socket.emit('send_private_message', {
      "room": messageObject.room,
      "content": messageObject.content,
      "sender_id": messageObject.sender_id,
      "receiver_id": messageObject.receiver_id
  });

    console.log('entered send message --')
  }

  async function handleSubmit(e) {
    e.preventDefault();

    var messageObject = {
      'room': currentRoomId,
      'sender_id': '123',
      'receiver_id': '456',
      'content': userValue + ': ' + e.target.messageInputValue.value,
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
