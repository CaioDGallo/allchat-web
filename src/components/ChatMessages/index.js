import React, { useEffect, useState } from 'react';
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

            // if(response.status == 200){
            //     socket.emit('clear_pending_messages_for_this_user', {'user_id':Cookies.get('_id'), 'room': roomId})
            // }

            dispatch({ type: 'LOAD_MESSAGES', messages: response.data })
        }

        loadMessages()

        if (socket) {

            socket.on('private_message', function (data) {
                console.log('onmsg PRIVATE ' + data.data + 'messages: ' + messages)
                dispatch({ type: 'STORE_MESSAGE', messages: data })
                socket.emit('message_delivered', data)
            });

            socket.on('delivered_confirmation', function (data) {
                //Message was marked and confirmed as delivered, maybe notify this to the clients
            });
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
