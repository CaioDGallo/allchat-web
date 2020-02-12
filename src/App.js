import React from 'react';

import './global.css';
import './App.css';
import './Main.css';

import WebSocketComponent from './components/WebSocketComponent';

function App() {

  return (
    <div id="app">
      <main>
        <strong>Chat</strong>
        <WebSocketComponent />
      </main>
    </div>
  );
}

export default App;
