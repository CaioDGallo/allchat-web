import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './styles.css';

function UserItem({ user }) {
    const dispatch = useDispatch();

    return (
        <li className="user-item" onClick={() => {
            dispatch({ type: 'STORE_SELECTED_USER', selectedUser: user })
        }}>
            <Link to="/chatroom">
                <img src="https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fes%2Fsearch%2Fperson%2Bplaceholder%3Fimage_type%3Dillustration%26safe%3Dtrue%26search_source%3Dbase_related_searches%26ref_context%3Dkeyword&psig=AOvVaw2izuQ7d2CgXh_hGSuK8hN7&ust=1583177447047000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCKrt6B-ucCFQAAAAAdAAAAABAD" alt={user.username} />
                <div className="user-info">
                    <strong>{user.username}</strong>
                </div>
            </Link>
            {/* Placeholder image for now, later put user img */}
        </li>
    );
}

export default UserItem;