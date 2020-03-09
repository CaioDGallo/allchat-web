import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Redis from 'redis';

import UserItem from '../UserItem';
import api from '../../services/api';

import './styles.css';
import '../../global.css';

function ChatLobby() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const client = null;

    //Get Logged users to display below
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/user', { headers: { 'Authorization' : `Bearer ${Cookies.get('auth')}` }, params: {'_id':Cookies.get('_id')} })

            setUsers(response.data)
        }

        client = Redis.createClient(6379);
        client.setex('test', 3600, 'funcionou');

        //Start Websocket
        //dispatch({ type: 'START_SOCKET', address: "https://pure-bastion-70060.herokuapp.com" })
        dispatch({ type: 'START_SOCKET', address: 'http://localhost:3000' })

        loadUsers()
    }, [])

    return (
        <main>
            <div id='users-container' onClick={() => {
                client.get('test', (err, data) => {
                    if (err) throw err;
                
                    if (data !== null) {
                      alert(data)
                    }
                  });
            }}>
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