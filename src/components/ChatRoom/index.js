import React, { useEffect } from 'react';
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

    useEffect(() => {
        const roomId = util.generateRoomId(selectedUser._id, Cookies.get('_id'))
        dispatch({ type: 'STORE_ROOM_ID', currentRoomId: roomId })
        socket.emit('subscribe', roomId);// 1 = conversation_id
    }, [])

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
