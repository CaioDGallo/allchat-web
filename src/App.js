import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Main.css';

import ChatForm from './components/ChatForm';
import WebSocketComponent from './components/WebSocketComponent';

function App() {
  const [messages, setMessages] = useState([]);
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
  }, []);
  
  return (
    <div id="app">
      <main>
        <WebSocketComponent />
        <strong>Chat</strong>
        <ul>
          {messages.map(message => (
            //FIX THIS, A UNIQUE KEY IS A MUST
            <p key={message.message}>{message.message}</p>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
