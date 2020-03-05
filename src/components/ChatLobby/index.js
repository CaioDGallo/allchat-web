import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import UserItem from '../UserItem';
import api from '../../services/api';

import './styles.css';
import '../../global.css';

function ChatLobby() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    //Get Logged users to display below
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/user', { headers: { 'Authorization' : `Bearer ${Cookies.get('auth')}` } })

            console.log(response)
            setUsers(response.data)
        }

        //Start Websocket
        dispatch({ type: 'START_SOCKET', address: "http://localhost:3000" })

        loadUsers()
    }, [])

    return (
        <main>
            <div id='users-container'>
                <ul id='users-list'>
                    {
                        users.map(user => (
                            <UserItem key={user._id} user={user} />
                        ))
                    }
                </ul>
            </div>
        </main>
    );
}

export default ChatLobby;