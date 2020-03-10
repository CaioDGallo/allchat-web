import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import api from '../../services/api';

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
      "room": messageObject.room,
      "content": messageObject.content,
      "sender_id": messageObject.sender_id,
      "receiver_id": messageObject.receiver_id,
      "pending": true
    }
    socket.emit('send_private_message', msg);

    saveMessageOnDatase(msg)

    console.log('entered send message --')
  }

  async function handleSubmit(e) {
    e.preventDefault();

    var messageObject = {
      'room': roomId,
      'sender_id': Cookies.get('_id'),
      'receiver_id': selectedUser._id,
      'content':  Cookies.get('username') + ': ' + e.target.messageInputValue.value,
      "pending": true
    }

    sendMessage(messageObject)
    setMessageInputValue('')
  }

  //Temporarily saving messsages one by one
  async function saveMessageOnDatase(msg){
    const response = await api.post('/messages', {messages: [msg]},{ headers: { 'Authorization' : `Bearer ${Cookies.get('auth')}` } })
    console.log(response.data)
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
