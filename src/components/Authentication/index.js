import React from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import api from '../../services/api';
import { useEffect } from 'react';

function Authentication() {
    let history = useHistory();

    useEffect(() =>{
        //Temporary logs out everytime this component renders for test purposes
        Cookies.remove('auth')
        Cookies.remove('email')
        Cookies.remove('_id')
        Cookies.remove('username')
        //--
    }, [])

    async function handleLogin(e){
        e.preventDefault();

        api.post('/session', {
            email: e.target.email.value,
            password: e.target.password.value
          })
          .then(function (response) {
            console.log(response.data);
            if(response.status === 200 && response.data.token){
                Cookies.set('auth', response.data.token, { expires: 7 })
                Cookies.set('email', response.data.user.email, { expires: 7 })
                Cookies.set('_id', response.data.user._id, { expires: 7 })
                Cookies.set('username', response.data.user.username, { expires: 7 })

                history.push('/lobby')
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    return (
        <>
            <form onSubmit={handleLogin} id='login-form'>
                <div className="input-block">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        id="email"
                        required
                        type="email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        id="password"
                        required
                        type="password"
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Authentication;