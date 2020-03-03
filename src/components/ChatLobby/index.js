import React, { useEffect, useState } from 'react';
import UserItem from '../UserItem';
import api from '../../services/api';

import './styles.css';
import '../../global.css';

function ChatLobby() {
    const [users, setUsers] = useState([]);

    //Get Logged users to display below
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/user')

            console.log(response)
            setUsers(response.data)
        }

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