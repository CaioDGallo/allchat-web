import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

import './styles.css';

function ChatMessages() {
    const socket = useSelector(state => state.socket);
    const [messages, setMessages] = useState([])

    useEffect(() => {
        async function loadMessages() {
            const response = await api.get(`/messages?sender_id=${123}&receiver_id=${456}`,
                { headers: { 'Authorization': `Bearer ${Cookies.get('auth')}` } }
            )

            setMessages(response.data)
        }

        loadMessages()

        socket.on('message', (data) => {
            console.log('onmsg ' + data)

            setMessages(data)
        });

        socket.on('user_connection', (data) => {
            console.log("connected websocket main component" + data.content);
            socket.emit('message', data);
            setMessages(data)
        });

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
