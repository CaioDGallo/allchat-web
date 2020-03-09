import React, { useEffect, useState } from 'react';
import ChatForm from '../ChatForm';
import ChatMessages from '../ChatMessages';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import * as util from '../../util/util';

import './styles.css';

function ChatRoom() {
    const socket = useSelector(state => state.socket);
    const selectedUser = useSelector(state => state.selectedUser);
    const dispatch = useDispatch();
    const roomId = util.generateRoomId(selectedUser._id, Cookies.get('_id'))

    useEffect(() => {
        socket.emit('subscribe', roomId);// 1 = conversation_id
    }, [])

    return (
        <>
            <div id='chat'>
                <ChatMessages roomId={roomId} />
                <ChatForm roomId={roomId} />
            </div>
        </>
    );
}

export default ChatRoom;
