import React from 'react';

import './styles.css';

function ChatMessages({ messages }) {

    return (
        <div id='chat-messages'>
            <ul>
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
