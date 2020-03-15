import React, { useEffect } from 'react';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';

import './styles.css';

function ChatMessages({ roomId }) {
    const socket = useSelector(state => state.socket);
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadMessages() {
            const response = await api.get(`/messages?room=${roomId}`,
                { headers: { 'Authorization': `Bearer ${Cookies.get('auth')}` } }
            )

            dispatch({ type: 'LOAD_MESSAGES', messages: response.data })
        }

        loadMessages()

        if (socket) {

            socket.on('private_message', function (data) {
                dispatch({ type: 'STORE_MESSAGE', messages: data })
                socket.emit('message_delivered', data)
            });;
        }

    }, [])

    return (
        <div id='messages-container'>
            <ul id='chat-messages'>
                {
                    messages.map(message => (
                        <p className="chat-message-item" key={Math.random()} >{message.content}</p>
                    ))
                }
            </ul>
        </div>
    );
}

export default ChatMessages;
