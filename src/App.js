import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Main.css';

import ChatForm from './components/ChatForm';

function App() {
  const [messages, setMessages] = useState([]);
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    setupWebSocket()
  }, []);

  async function setupWebSocket() {
    let socket = new WebSocket("wss://pure-bastion-70060.herokuapp.com/");
    setWebSocket(socket)

    socket.onopen = function (e) {
      socket.send("Connection established");
    };

    socket.onmessage = function (event) {
      var data = {
        message: `Message received from server: ${event.data}`
      }
      handleReceiveMessage(data)
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
  
  function handleSendMessage(data) {
    console.log("handleSendMessage " + data.message)
    webSocket.send(data.message)
    setMessages([...messages, data])
    console.log([...messages, data])
  }

   function handleReceiveMessage(data) {
    setMessages([...messages, data])
    console.log([...messages, data])  
  }

  return (
    <div id="app">
      <main>
        <strong>Chat</strong>
        <ChatForm onSubmit={handleSendMessage} />
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
