import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Main.css';

import ChatForm from './components/ChatForm';

function App() {
  const [messages, setMessages] = useState('');

  useEffect(() => {
    async function loadMessages() {
      let socket = new WebSocket("wss://pure-bastion-70060.herokuapp.com/");

      socket.onopen = function (e) {
        alert("[open] Connection established");
        alert("Sending to server");
        socket.send("My name is John");
      };

      socket.onmessage = function (event) {
        setMessages(`Message received from server: ${event.data}`)
      };

      socket.onclose = function (event) {
        if (event.wasClean) {
          alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          alert('[close] Connection died');
        }
      };

      socket.onerror = function (error) {
        alert(`[error] ${error.message}`);
      };
    }

    loadMessages();
  }, []);

  async function handleSendMessage(data) {
    const response = await api.post('/devs', data)

    setMessages(response.data);
  }

  return (
    <div id="app">
      <main>
        <strong>Chat</strong>
        <ChatForm onSubmit={handleSendMessage} />
        <p>{messages}</p>
      </main>
    </div>
  );
}

export default App;
