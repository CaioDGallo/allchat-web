import React from 'react';

import './styles.css';

function ChatMessages({ messages }) {

    return (
        <div id='messages-container'>
            <ul id='chat-messages'>
                {
                    messages.map(message => (
                        <p className="chat-message-item" key={Math.random()} >{message.message}</p>
                    ))
                }
            </ul>
        </div>
    );
}

export default ChatMessages;
