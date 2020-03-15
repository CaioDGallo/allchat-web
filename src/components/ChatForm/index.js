import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import * as util from '../../util/util';
import api from '../../services/api';

import './styles.css';

function ChatForm({ roomId }) {
  const [messageInputValue, setMessageInputValue] = useState('');
  const socket = useSelector(state => state.socket);
  const selectedUser = useSelector(state => state.selectedUser);
  const dispatch = useDispatch();

  function sendMessage(messageObject) {
    dispatch({ type: 'STORE_MESSAGE', messages: messageObject })
    socket.emit('send_private_message', messageObject);

    saveMessageOnDatase(messageObject)
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

    async function saveMessageOnDatase(msg){
      const response = await api.post('/messages', {messages: [msg]},{ headers: { 'Authorization' : `Bearer ${Cookies.get('auth')}` } })
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
