import React from 'react';

import './global.css';
import './App.css';
import './Main.css';

import ChatRoom from './components/ChatRoom';

function App() {

  return (
    <div id="app">
      <main>
        <strong>Chat</strong>
        <ChatRoom />
      </main>
    </div>
  );
}

export default App;
