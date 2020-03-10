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
            const response = await api.get('/user', { headers: { 'Authorization': `Bearer ${Cookies.get('auth')}` }, params: { '_id': Cookies.get('_id') } })

            setUsers(response.data)
        }

        //Start Websocket
        dispatch({ type: 'START_SOCKET', address: "https://pure-bastion-70060.herokuapp.com" })

        loadUsers()
    }, [])

//temporary signout button
    function signOut(){
        Cookies.remove('auth')
        Cookies.remove('_id')
        Cookies.remove('username')
        Cookies.remove('email')
        window.location.reload();
    }

    return (
        <main>
            <button type="button" onClick={signOut}>Sign Out</button>
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