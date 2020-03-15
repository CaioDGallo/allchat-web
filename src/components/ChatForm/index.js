import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import * as util from '../../util/util';

import './styles.css';

function ChatForm({ roomId }) {
  const [messageInputValue, setMessageInputValue] = useState('');
  const socket = useSelector(state => state.socket);
  const selectedUser = useSelector(state => state.selectedUser);
  const dispatch = useDispatch();

  function sendMessage(messageObject) {
    dispatch({ type: 'STORE_MESSAGE', messages: messageObject })
    //socket.emit('message', messageObject)
    const msg = {
      "_id": messageObject._id,
      "room": messageObject.room,
      "content": messageObject.content,
      "sender_id": messageObject.sender_id,
      "receiver_id": messageObject.receiver_id,
      "pending": true
    }
    socket.emit('send_private_message', msg);

    console.log('entered send message -- ', msg)
  }

  async function handleSubmit(e) {
    e.preventDefault();

    var messageObject = {
      "_id": util.uuidv4(),
      'room': roomId,
      'sender_id': Cookies.get('_id'),
      'receiver_id': selectedUser._id,
      'content':  Cookies.get('username') + ': ' + e.target.messageInputValue.value,
      "pending": true
    }

    sendMessage(messageObject)
    setMessageInputValue('')
  }

  return (
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

      <button type="submit">Send</button>
    </form>
  );
}

export default ChatForm;
