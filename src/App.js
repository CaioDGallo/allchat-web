import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Main.css';

import ChatForm from './components/ChatForm';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      //const response = await api.get('/devs');

      //setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <main>
      <strong>Chat</strong>
        <ChatForm onSubmit={handleAddDev} />
      </main>
    </div>
  );
}

export default App;
