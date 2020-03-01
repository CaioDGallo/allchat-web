import React from 'react';

import './global.css';
import './App.css';
import './Main.css';

import ChatRoom from './components/ChatRoom';
import ChatLobby from './components/ChatLobby';

function App() {

  return (
    <div id="app">
      <main>
        {/* <strong>Chat</strong>
        <ChatRoom /> */}
        <ChatLobby />
      </main>
    </div>
  );
}

export default App;
