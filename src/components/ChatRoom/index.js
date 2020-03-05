import React, { Component, useState, useEffect } from 'react';
import ChatForm from '../ChatForm';
import ChatMessages from '../ChatMessages';

import './styles.css';

function ChatRoom() {
    return (
        <>
            <div id='chat'>
                <ChatMessages />
                <ChatForm />
            </div>
        </>
    );
}

export default ChatRoom;
